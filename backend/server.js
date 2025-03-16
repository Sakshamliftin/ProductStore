import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import productRouter from './routes/product.routes.js';
import path from "path";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000

const __dirname = path.resolve();

app.use(express.json()) //allows to use json in request body

// app.get('/', (req, res) => {
//   res.send('home.js');
// })

app.use('/api/products', productRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile
      (path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  }
  )
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server running at http://localhost:5000");

})

// ILXOALNDRwxrmnXD