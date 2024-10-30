const mongoose = require('mongoose');
require('dotenv').config();

const mongodbLocal = process.env.MONGODB_URL_LOCAL;
const mongodbLiveURL = process.env.MONGODB_URL;
// const mongodbURL =mongodbLocal;
// set up mongoddb connnection
// ************* remote host ----------------
// mongodb+srv://<db_username>:<db_password>@cluster0.ayyhp.mongodb.net/
const mongodbURL = mongodbLiveURL;

mongoose.connect(mongodbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})

// get the default onnection connection
 const db = mongoose.connection;

 db.on('connected', () => {
    console.log('Mongoose connection established');
 })
 db.on('error', (err) => {
    console.log('Mongoose connection error: ', err);
 })

 db.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
 })

//  export database connections

module.exports =db;