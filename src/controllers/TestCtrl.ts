import Koa = require('koa')
import { HttpErrorModel } from '@/models'
import {getTest} from '@/services'
/**
 * 测试用路由
 *
 * @author digitalcnzz
 * @date 2021-01-04
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export function testCtrl(ctx: Koa.Context, next: Koa.Next) {
    console.log('ctx', ctx.params, ctx.query)
    ctx.status = Number(ctx.params?.status || ctx.query?.status || ctx.request.body?.status || 200)
    if (ctx.query?.error) {
        throw new Error('出现了Error')
    }
    if (ctx.query?.httpError || ctx.query?.httperror || ctx.query?.http_error) {
        if (ctx.status < 400) {
            ctx.status = 500
        }
        throw new HttpErrorModel(ctx.status, '出现了HttpError')
    }
    ctx.noCache = true
    ctx.body = {
        message: 'no-code center route test',
        data: {
            params: ctx.params,
            query: ctx.query,
            body: ctx.request.body,
        },
    }
}

export const getTestInfo = async (ctx: Koa.Context, next: Koa.Next) =>{

  let result:any = await getTest(ctx, next)
  console.log(result)
  if (result){
    ctx.status = 200
    ctx.body = {
        code: 200,
        data:result,
        message: '测试成功',
    }
} else {
    ctx.status = 200
    ctx.body = {
        code: 9000,
        message: '测试失败',
    }
}

}