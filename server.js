const express = require('express');
const app = express();
const db =  require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());// req.body
const porNo = process.env.PORT;
//  import routers
const router = require("./router/menuRoute");
const personRouter = require("./router/personRouter");

app.use('/person',personRouter);
app.use('/menu',router);
// test git status
app.listen(porNo,()=>{
    console.log('Server running on port 3000');
 
});
