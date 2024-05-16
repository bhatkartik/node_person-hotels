const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hoteldb'  //Replace 'hoteldb' with your database name


//Set up MongoDB Connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDB')
});

db.on('error',(err)=>{
    console.log('MongoDB connection error')
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected')
});

//Export the data connection
module.exports = db;
