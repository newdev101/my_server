const express = require("express");
const {connectMongod}=require('./connection');

const updateLog = require('./middlewares/index');
const userRouter = require("./routes/user")

const app = express();
const PORT = 8000;

//connecting to database
connectMongod('mongodb://127.0.0.1:27017/youtube_app_3');



//middleware
app.use(express.urlencoded({ extended: false })); //middle ware to get the input body
app.use(updateLog('log.txt')); //middleware for log update


//routes
app.use('/api/users',userRouter);

//defining port
app.listen(PORT, () => console.log("server connected"));
