import os = require('os')
import path = require('path')
import fs = require('fs-extra')
import Koa = require('koa')

export * from './NotFoundCtrl'
export * from './RobotsCtrl'
export * from './StatusCtrl'
export * from './TestCtrl'

/**
 * 根路径响应
 *
 * @author digitalcnzz
 * @date 2021-01-04
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function index(ctx: Koa.Context, next: Koa.Next) {
    let data = {
        ip: ctx.ip,
    }
    if (await fs.pathExists('package.json')) {
        try {
            const packages = JSON.parse((await fs.readFile('package.json')).toString())
            const { name, description, version } = packages
            data = Object.assign({ name, version, description }, data)
        } catch (error) {}
    }
    ctx.status = 200
    ctx.body = {
        message: 'Hello World',
        data: Object.assign({ date: new Date() }, data),
    }
}