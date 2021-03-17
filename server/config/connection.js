const mongoose = require('mongoose');

require('dotenv').config()

mongoose.Promise = global.Promise;

// mongoose.connection.on('connected', () => console.log('> 🚀 DB Connection Established'))

mongoose.connection.on('reconnected', () => console.log('> 🚀 DB Connection Reestablished'))

mongoose.connection.on('disconnected', () => console.log('> DB Connection Disconnected'))

mongoose.connection.on('close', () => console.log('> DB Connection Closed'))

mongoose.connection.on('error', (error) => console.log('> DB ERROR: ' + error))

mongoose.connect(process.env.DB_HOST,{
  useUnifiedTopology: true,
  useNewUrlParser: true
});

module.exports = mongoose;