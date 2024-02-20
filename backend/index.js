const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const env = require("dotenv");
env.config();

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

 
const userRouter = require('./routes/userRoutes')
app.use('/api', userRouter)
const productRouter = require('./routes/productRoutes')
app.use('/api', productRouter)
const reviewRouter = require('./routes/reviewRoutes')
app.use('/api', reviewRouter)
const orderRouter = require('./routes/orderRoutes')
app.use('/api', orderRouter)

// final