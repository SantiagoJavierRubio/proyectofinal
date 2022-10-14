import { errorLogger } from '../loggers/logger.js';

export const errorHandler = (err, req, res, next) => {
    if (err) {
        errorLogger.error(err)
        return res.status(err.statusCode || 500).json({
            error: err.message
        })
    } else return next()
}

export const handleUncaughtErrors = (err, req, res, next) => {
    if (err) return errorHandler(err, req, res)
    else return next();
}

export const handleBadRoute = (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: `ruta '${req.url}' método '${req.method}' no implementada`
    })
}
