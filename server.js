const express = require('express');
const app = express();
const db =  require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());// req.body

//  import routers
const router = require("./router/menuRoute");
const personRouter = require("./router/personRouter");

app.use('/person',personRouter);
app.use('/menu',router);

app.listen(3000,()=>{
    console.log('Server running on port 3000');
 
});
