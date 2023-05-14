import express from 'express';
import data from './data.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRouter.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use('/api/v1/seed', seedRouter);
app.use(cors());

app.get('/api/v1/products', (req, res) => {
  res.send(data.products);
});

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    console.log('Connected to db');
  })
  .catch((err) => {
    console.error(`Failed to connect to db: ${err.message}`);
  });
