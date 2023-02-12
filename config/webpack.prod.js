/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-09-27 15:41:53
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-09-30 15:11:11
 * @FilePath: /rtw/build/webpack.prod.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// webpack.prod.js

const { merge } = require('webpack-merge');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin=require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'), //复制public下文件
                    to: path.resolve(__dirname, '../dist'), //复制到目标目录下
                    filter: source => {
                        return !source.includes('index.html'); //忽略的文件
                    },
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
        }),
        new CompressionPlugin({
            test: /.(js|css)$/, // 只生成css,js压缩文件
            filename: '[path][base].gz', // 文件命名
            algorithm: 'gzip', // 压缩格式,默认是gzip
            test: /.(js|css)$/, // 只生成css,js压缩文件
            threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8, // 压缩率,默认值是 0.8
        }),
        // new PurgeCSSPlugin({
        //   paths: globAll.sync([
        //     `${path.join(__dirname, '../src')}/**/*.tsx`,
        //     path.join(__dirname, '../public/index.html')
        //   ]),
        //   safelist: {
        //     standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
        //   }
        // }),
    ],
    optimization: {
        minimizer: [
            // new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true, //开启多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'], // 删除这个代码
                    },
                },
            }),
        ],
        splitChunks: {
            // 分隔代码
            cacheGroups: {
                vendors: {
                    // 提取node_modules代码
                    test: /node_modules/, // 只匹配node_modules里面的模块
                    name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 1, // 提取优先级为1
                },
                commons: {
                    // 提取页面公共代码
                    name: 'commons', // 提取文件命名为commons
                    minChunks: 2, // 只要使用两次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                },
            },
        },
    },
});
