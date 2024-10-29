const mongoose = require('mongoose');

const mongodbURL = 'mongodb://localhost:27017/hotels';
// set up mongoddb connnection

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