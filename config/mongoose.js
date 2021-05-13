//require the library
const mongoose = require('mongoose')

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db')
//aquire the connection(to check the connection)
const db = mongoose.connection;
//show error if db is not connected
db.on('error',console.error.bind(console,'error in connecting to db'));
//show success message if it is connected
db.once('open',function(){
    console.log('Successfully connected to the database')
})