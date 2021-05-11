import Koa = require('koa')
import { DISALLOW_ROBOT } from '@/config'

/**
 * 爬虫路由
 *
 * @author digitalcnzz
 * @date 2021-01-04
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export function robotsCtrl(ctx: Koa.Context, next: Koa.Next) {
    if (DISALLOW_ROBOT) {
        ctx.set('Content-Type', 'text/plain')
        ctx.body = 'User-agent: *\nDisallow: *'
    }
}