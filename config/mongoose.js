//require monogoose package
const mongoose = require('mongoose');

//connect to mongodb db
mongoose.connect('mongodb://localhost/contact_list_db')

//acquire the connection( to check if it's successful)
const db=mongoose.connection;

//error
db.on('error', console.error.bind(console, 'connection error:'));

//success 
db.once('open', function() {
    console.log('connected to mongodb');
});