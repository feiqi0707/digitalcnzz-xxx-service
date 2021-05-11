import Router from '@koa/router'
import swaggerJSDoc = require('swagger-jsdoc')
import path = require('path')

const routes = new Router()

const swaggerDefinition = {
    info: {
        title: 'xxx项目接口文档',
        version: '1.0.0',
        description: '<h3>running engine: nodejs+koa2</h3>',
    },
    host: 'xx.xx.xx.xx:8089',
    basePath: '/',
}
// 192.168.102.227
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, './routes/*.ts')], 
}
const swaggerSpec = swaggerJSDoc(options)

routes.get('/swagger.json', async (ctx) => {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerSpec
})
module.exports = routes