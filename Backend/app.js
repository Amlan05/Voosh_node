
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

require('dotenv').config();

const port = process.env.PORT || 5000;

// routes
const userRouter = require('./Routes/UserRoutes')
const orderRouter = require('./Routes/OrderRoutes')

// middlewares
app.use(express.json())
app.use(cors())
app.use('/users', userRouter.userRouter)
app.use('/orders', orderRouter.orderRouter)


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.phkjaos.mongodb.net/?retryWrites=true&w=majority`);
  console.log("Database connected")
}

app.listen( 5000, () => {
    console.log("server connected")
})