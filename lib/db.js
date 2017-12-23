var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/db';
mongoose.connect(DB_URL, { useMongoClient: true });
mongoose.Promise = global.Promise; 
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;