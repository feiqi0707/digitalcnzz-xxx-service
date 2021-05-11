import Koa = require('koa')

export async function getTest(ctx: Koa.Context, next: Koa.Next) {
    let result = {
      id:1,
      name:'test'
    }
    // let sql = ''
    // await ctx.util.mysql(sql).then((res: any) => {
    //     result = res
    // })
    return result
}


