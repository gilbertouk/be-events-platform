import express, { Express, NextFunction, Request, Response } from 'express';

const app: Express = express();

app.get('/api', function (_req: Request, res: Response, _next: NextFunction) {
  res.status(200).send({ message: 'Api Okay!' });
});

export default app;
