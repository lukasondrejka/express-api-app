import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import expressWinston, { LoggerOptionsWithTransports } from 'express-winston';
import Helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import loggerConfig from './configs/logger.config';
import securityConfig from './configs/security.config';
import { handleError } from './helpers/response.helper';
import router from './routes/router';
import { Application, Request, Response, Status } from './types';

// App
const app: Application = express();

// Helmet security
app.use(Helmet());

// Cors security
app.use(cors(securityConfig.corsOptions));

// Body-parser
app.use(bodyParser.json());

// Morgan request logger
app.use(morgan(loggerConfig.morgan.format));

// Winston logger
app.use(expressWinston.logger(<LoggerOptionsWithTransports>loggerConfig.winston));

// Static files in public folder
app.use('/public', <Application>express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use(router);

// Health check route
app.get('/api/health', (req: Request, res: Response) => res.status(Status.OK).json({ health: 'ok' }));

// Not found route
app.use((req: Request, res: Response) => handleError(res, Status.NOT_FOUND, 'Route not found'));

export default app;
