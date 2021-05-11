import path = require('path')
import fs = require('fs-extra')
import Koa = require('koa')
import Router = require('@koa/router')
import bodyParser = require('koa-bodyparser')
import koaBody = require('koa-body')
import cors = require('@koa/cors')
import serve from 'koa-static'
import cacheControl from 'koa-cache-control'
import {
    appLogger, catchError,
    limiter, timeout,
} from './middleware'
import routes from './routes'
import { ROOT_URL, STATIC_MAX_AGE } from './config'
const swagger = require('./swagger')
import koaSwagger from 'koa2-swagger-ui'
import koaSession from 'koa-session'
import { tokenUtils } from '@/utils'

const app = new Koa()
const router = new Router()

app.proxy = true

app.use(appLogger)
app.use(catchError)
app.use(timeout)
// app.use(cacheControl)
app.use(cors({
    credentials: true,
}))
// app.use(bodyParser())
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFieldsSize: 10 * 1024 * 1024,
    },
}))
app.use(limiter)
const sessionConfig = {
    key: 'openPlatformSystem:sess',   
    maxAge: 1000 * 60 * 60 * 30, 
    autoCommit: true,
    overwrite: true,  
    httpOnly: true, 
    signed: true,  
    rolling: true,  
    renew: false,
}
app.keys = ['noCodeSystem']
app.use(koaSession(sessionConfig, app))

app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.util = {
        mysql: require('./utils/mysql'),
    }
    await next()
})

app.use(swagger.routes()).use(swagger.allowedMethods())
app.use(koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: {
        url: '/swagger.json',
    },
}))

const pubicPath = path.join(__dirname, '../public')
if (fs.pathExistsSync(pubicPath)) {
    // public 并非必须，如果有则挂载
    app.use(serve(pubicPath, {
        maxAge: STATIC_MAX_AGE * 1000,
    }))
}

router.all('*', async (ctx: Koa.Context, next: Koa.Next) => {
    // console.log('router-all', ctx, ctx.request.header.origin)
    // ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
    // ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    // ctx.set('Access-Control-Allow-Credentials', 'true')
    if (ctx.method === 'OPTIONS') {
        ctx.body = {
            code: 200,
        } 
    } else {
        await next() 
    }
}) 

// 加载路由
router.use(ROOT_URL, routes.routes(), routes.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())
// console.log(router.stack)
export { app }