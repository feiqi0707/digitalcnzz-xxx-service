import mysql from 'mysql'
import { config } from '../db'
let pools: any = {}// 连接池

// eslint-disable-next-line no-prototype-builtins
if (!pools.hasOwnProperty('host')) { // 是否存在连接池
    pools['host'] = mysql.createPool(config)
}
const query = (sql: string, parameter: any) => {
    return new Promise((resolve, reject) => {
        pools['host'].getConnection((err: any, connection: any) => { // 初始化连接池
            if (err) {
                console.log(err, '数据库连接失败') 
            } else {
                connection.query(sql, parameter, (queryErr: any, results: any) => { // 去数据库查询数据
                    connection.release()// 释放连接资源
                    if (queryErr) {
                        reject(queryErr) 
                    } else {
                        resolve(results) 
                    }
                }) 
            }
        })
    })
}
module.exports = query