import mongoose from "mongoose";

require('dotenv').config()

mongoose.Promise = global.Promise;

// mongoose.connection.on('connected', () => console.log('> 🚀 DB Connection Established'))

mongoose.connection.on('reconnected', () => console.log('> 🚀 DB Connection Re-established'))

mongoose.connection.on('disconnected', () => console.log('> DB Connection Disconnected'))

mongoose.connection.on('close', () => console.log('> DB Connection Closed'))

mongoose.connection.on('error', (error) => console.log('> DB ERROR: ' + error))

mongoose.connect("mongodb://localhost:27017/express_gql",{ //process.env.DB_HOST
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

export default mongoose;