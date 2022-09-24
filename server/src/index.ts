import 'reflect-metadata';
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/Error.middleware';
import config from './config';
import { AppDataSource } from './database';
import { routes } from './routes';

const app: Application = express();

AppDataSource.initialize()
  .then(() => {
    const PORT = config.port_server || 8000;

    const limiter = rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many requests from this IP',
    });

    app.use(express.json());
    app.use(morgan('common'));
    app.use(helmet());
    app.use(limiter);
    app.use(routes);

    app.use(errorMiddleware);

    app.listen(PORT, () => {
      console.log(`Server running in port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database connection error: ', err);
  });

export default app;
