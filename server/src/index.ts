import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import { AppDataSource } from './database';

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

    app.get('/', (req: Request, res: Response) => {
      res.json({
        message: 'Hello World',
      });
    });
    app.post('/', (req: Request, res: Response) => {
      // console.log(req.body);
      res.json({
        message: 'Hello World',
        data: req.body,
      });
    });

    app.use(errorMiddleware);

    app.use((_req: Request, res: Response) => {
      res.status(404).json({
        message: 'Oh you are lost',
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running in port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database connection error: ', err);
  });

export default app;
