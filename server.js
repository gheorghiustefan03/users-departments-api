require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routers');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`);
})

//todo
//implement login