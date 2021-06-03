import express from 'express';
import cors from 'cors';
import router from './routes.js';

const app = express();

const PORT = 4000;

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors());

app.get('/', (req, res) => res.send('ok'));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});