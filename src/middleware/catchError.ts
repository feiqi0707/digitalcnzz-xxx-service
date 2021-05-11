import Koa = require('koa')
import { HttpErrorModel, HttpStatusCodeModel, ResponseModel } from '@/models'
import { IS_DEBUG } from '@/config'
import { Log } from '@/utils'
import { errorLogger } from './logger'
export async function catchError(ctx: Koa.Context, next: Koa.Next) {
    try {
        await next()
    } catch (e) {
        let message: string | undefined = 'Unknown Error'
        let statusCode = HttpStatusCodeModel.INTERNAL_SERVER_ERROR
        let stack: string | undefined
        if (e instanceof HttpErrorModel) {
            message = e.message
            statusCode = e.statusCode
        } else if (e instanceof Error) {
            message = e.message
            // 开发阶段打印堆栈信息
            if (IS_DEBUG) {
                stack = e.stack
            }
        } else if (typeof e === 'string') {
            message = e
        }
        if (statusCode >= HttpStatusCodeModel.INTERNAL_SERVER_ERROR) {
            Log.error(e)
            errorLogger.error(e)
        } else {
            Log.log(message)
        }
        ctx.status = statusCode
        ctx.body = new ResponseModel({
            statusCode,
            message,
            stack,
        })
    }
}