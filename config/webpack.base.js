/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-09-27 15:41:31
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-09-30 14:34:35
 * @FilePath: /rtw/build/webpack.base.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path =require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports={
    entry:path.join(__dirname,'../src/index.tsx'),
    output:{
        filename:'static/js/[name].[chunkhash:8].js',
        path:path.join(__dirname,'../dist'),
        clean:true,
        publicPath:'./'
    },
    module:{
        rules:[
            {
                test: /.css$/, //匹配所有的 css 文件
                include: [path.resolve(__dirname, '../src')],
                use: [
                isDev?'style-loader':MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
                ],
            },
            {
                test: /.less$/, //匹配所有的 less 文件
                include: [path.resolve(__dirname, '../src')],
                use: [
                isDev?'style-loader':MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader'
                ]
            },
            {
                test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator:{ 
                    filename:'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test:/.(woff2?|eot|ttf|otf)$/,
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:10*1024,
                    }
                },
                generator:{ 
                    filename:'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb转base64位
                }
                },
                generator:{ 
                    filename:'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
                },
            },
            {
                include:[path.resolve(__dirname,'../src')],
                test:/.(ts|tsx)$/,
                use:["thread-loader","babel-loader"]
            }
        ]
    },
    //配置extensions 当引入模块不带后缀时 这个配置会依次加后缀查找文件 ts不支持以.ts,tsx为后缀的文件
    resolve:{
        extensions:['.js','.tsx','.ts'],
        alias:{
            '@':path.join(__dirname,'../src')
        },
        modules:[
            path.resolve(__dirname,'../node_modules')
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'),
            inject:true
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV':JSON.stringify(process.env.BASE_ENV)
        })
    ],
    cache:{
        type:'filesystem'
    }
}