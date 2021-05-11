import moment from 'moment'
moment.suppressDeprecationWarnings = true

/**
 * 获取当前时间戳
 */
export const getTimestamp = () => {
    return moment().format('X') 
}

/**
 * 时间戳转换成时间格式YYYY-MM-DD HH:mm:ss
 */
export const convertTimestamp = (timestamp: number) => {
    return moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')
}