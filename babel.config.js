/*
 * @Author: zhanghouyi zhanghouyi@baoxiaohe.com
 * @Date: 2022-09-28 15:13:46
 * @LastEditors: zhanghouyi zhanghouyi@baoxiaohe.com
 * @LastEditTime: 2022-09-30 10:09:37
 * @FilePath: /rtw/babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const isDev=process.env.NODE_ENV==='development';
module.exports={
    "presets":[
        [
            "@babel/preset-env",
            {
                "useBuiltIns":"usage",
                "corejs":3
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    "plugins":[
        [
            "@babel/plugin-proposal-decorators",{"legacy":true}
        ],
        isDev&&require.resolve('react-refresh/babel')
    ].filter(Boolean)
}