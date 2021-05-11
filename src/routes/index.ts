import Router from '@koa/router'
import path = require('path')
import fs = require('fs-extra')
import Koa = require('koa')
import { 
    notFoundCtrl, 
    robotsCtrl, 
    statusCtrl, 
    getTestInfo,
} from '@/controllers'

const routes = new Router()

routes.get('/', (ctx: Koa.Context, next: Koa.Next) => {
    ctx.status = 200
    ctx.body = {
        code: 9400,
        message: 'xxxx平台接口文档',
    }
})
/**
 * @swagger
 * /status:
 *   get:
 *     summary: 测试
 *     description: 测试
 *     tags:
 *       - 测试接口
 *     responses:
 *       200:
 *         description: 成功获取
 */
routes.get('/status', statusCtrl) 
routes.get('/robots.txt', robotsCtrl)

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: 测试
 *     description: 测试
 *     tags:
 *       - 测试接口
 *     parameters:
 *       - name: id
 *         required: false
 *         description: 测试编号
 *     responses:
 *       200:
 *         description: 成功获取
 */
routes.get('/api/test', getTestInfo) 


// 处理404
routes.all('*', notFoundCtrl)

export default routes