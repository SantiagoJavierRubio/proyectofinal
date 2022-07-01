import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import __yargs from 'yargs';
import passport from 'passport';
import rutasProductos from './rutas/productos.js';
import rutasCarrito from './rutas/carrito.js';
import rutasAuth from './rutas/auth.js';
import checkAuth from './passport/checkAuth.js';
import { logger, errorLogger } from './loggers/logger.js';
import { errorHandler, handleBadRoute } from './error_handling/errorHandler.js';
import './passport/localStrategy.js';
import __dirname from './dirname.js';

// Constantes globales
const yargs = __yargs(process.argv.slice(2));
const args = yargs
  .default('puerto', 8080)
  .default('localDB', false)
  .default('modo', 'fork').argv;

const MONGO_URL = args.localDB
  ? process.env.LOCAL_MONGO_URL
  : process.env.CLOUD_MONGO_URL;

// SERVER SETUP
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);

// PASSPORT SETUP
app.use(passport.initialize());
app.use(passport.session());

// HBS setup
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
  })
);
app.set('views', './views');
app.set('view engine', 'hbs');

// RUTAS FRONT
app.get('/', checkAuth, (req, res) => {
  res.render('home', { admin: process.env.ADMIN_MODE });
});
app.use('/auth', rutasAuth);
app.use('/productos', rutasProductos);
app.use('/carrito', rutasCarrito);

// ERROR HANDLING MIDDLEWARES
app.use(errorHandler);
app.use(handleBadRoute);

// START SERVER
const PORT = process.env.PORT || args.puerto;

const startServer = () => {
  mongoose.connect(MONGO_URL, (err) => {
    if (err) return logger.error(err);
    logger.info(
      `MongoDB conectado a ${args.localDB ? 'local' : 'cloud atlas'}`
    );
  });
  const server = app.listen(PORT, () => {
    logger.info(`Servidor escuchando en el puerto ${PORT}`);
  });
  server.on('error', (err) => {
    errorLogger.error(`Server error: ${err}`);
  });
};

if (args.modo === 'cluster') {
  const { default: cluster } = await import('cluster');
  const { default: os } = await import('os');
  if (cluster.isMaster) {
    logger.info('Iniciando en modo CLUSTER');
    logger.info(`Master ${process.pid} is running`);
    const cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, _code, _signal) => {
      logger.warn(`worker ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    startServer();
  }
} else {
  logger.info('Iniciando en modo FORK');
  startServer();
}
