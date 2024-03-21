require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routers');
app.use(express.json());

app.use('/api', router);

app.listen(process.env.PORT, ()=>{
    console.log(`Server running at ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`);
})

//todo
//test user routes w/o middleware
//implement user middleware
//test user middleware
//implement login, file upload