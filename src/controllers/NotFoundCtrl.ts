import Koa = require('koa')
import { HttpErrorModel, HttpStatusCodeModel } from '@/models'
/**
 * 处理404
 *
 * @author digitalcnzz
 * @date 2021-01-04
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export function notFoundCtrl(ctx: Koa.Context, next: Koa.Next) {
    throw new HttpErrorModel(HttpStatusCodeModel.NOT_FOUND, `Cannot ${ctx.method} ${ctx.path}`)
}