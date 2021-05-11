import { LIMIT } from '@/config'
import ratelimit = require('koa-ratelimit')
import Redis = require('ioredis')
import Koa = require('koa')
const db = new Map()
/**
 * 限流
 */
// export const limiter = RateLimit.middleware({
//     interval: { sec: LIMIT.LIMIT_INTERVAL },
//     max: LIMIT.LIMIT_MAX,
//     message: '请求次数超限; Too many requests, please try again later.',
// })

export const limiter = ratelimit({
    driver: 'memory',
    db,
    // driver: 'redis',
    // db: new Redis(),
    duration: LIMIT.LIMIT_INTERVAL,
    errorMessage: '系统需要及时降级和限流.',
    id: (ctx: any) => ctx.ip,
    headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total',
    },
    max: LIMIT.LIMIT_MAX,
    disableHeader: false,
    whitelist: (ctx: any): any => {
    // some logic that returns a boolean
    },
    blacklist: (ctx: any): any => {
    // some logic that returns a boolean
    },
})