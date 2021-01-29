import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import fetchCookie from 'fetch-cookie/node-fetch';
import auth from './auth';
import cors from 'cors';
import logger from './utils/logger';
import cookieParser from 'cookie-parser';

global.fetch = fetchCookie(fetch);

const app = express();
app.use(cors());
app.use(cookieParser('asdfiojasdnadfgoisdfgh'));
app.use(express.json());
app.get('/', (req, res) => {
  console.log(req.url);
  res.send('working');
});
app.use('/auth', auth);

app.listen(process.env.PORT, () => {
  logger.log(`listening on ${process.env.PORT}`);
});
