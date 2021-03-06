import os = require('os')
import path = require('path')
import fs = require('fs-extra')
import cluster = require('cluster')
import Koa = require('koa')
import pidusage from 'pidusage'
import { dataFormat, timeFromNow } from '@/utils'

/**
 * 状态监测路由
 *
 * @author digitalcnzz
 * @date 2021-01-04
 * @export
 * @param {Koa.Context} ctx
 * @param {Koa.Next} next
 */
export async function statusCtrl(ctx: Koa.Context, next: Koa.Next) {
    const stat = await pidusage(process.pid)
    let data = {
        nodeVersion: process.versions.node,
        ip: ctx.ip,
        workerId: cluster?.worker?.id,
        stat: {
            memory: dataFormat(stat.memory),
            cpu: `${stat.cpu.toFixed(2)} %`,
            runtime: timeFromNow(stat.elapsed),
        },
        os: {
            type: os.type(),
            release: os.release(),
            cpuArch: os.arch(),
            cupNum: os.cpus().length,
            loadavg: os.loadavg(),
            totalmem: dataFormat(os.totalmem()),
            freemem: dataFormat(os.freemem()),
            uptime: timeFromNow(os.uptime() * 1000),
        },
    }
    if (await fs.pathExists('package.json')) {
        try {
            const packages = await fs.readJSON('package.json')
            const { name, description, version } = packages
            data = Object.assign({ name, version, description }, data)
        } catch (error) {

        }
    }
    ctx.status = 200
    ctx.body = {
        data: Object.assign({ date: new Date() }, data),
    }
    ctx.noCache = true
}