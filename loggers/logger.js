import log4js from 'log4js'

log4js.configure({
    appenders: {
        consola: { type: 'console' },
        errores: { type: 'file', filename: `${process.cwd()}/loggers/logs/error.log`}
    },
    categories: {
        default: { appenders: ['consola'], level: 'all'},
        errores: { appenders: ['errores', 'consola'], level: 'error'}
    }
})

export const logger = log4js.getLogger()
export const errorLogger = log4js.getLogger('errores')