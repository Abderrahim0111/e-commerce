const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const env = require("dotenv");
env.config();

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

// CORS configuration
const allowedOrigins = ['http://localhost:5173']; // Add other allowed origins as needed
const corsOptions = {
  origin: function(origin, callback) {
    // Check if the origin is in the allowed origins list or if it's undefined (local request)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

const userRouter = require('./routes/userRoutes')
app.use('/api', userRouter)
const productRouter = require('./routes/productRoutes')
app.use('/api', productRouter)
const reviewRouter = require('./routes/reviewRoutes')
app.use('/api', reviewRouter)
const orderRouter = require('./routes/orderRoutes')
app.use('/api', orderRouter)
