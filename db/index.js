import mongoose from 'mongoose'
require('dotenv').config()

const databaseURL=process.env.MONGODB;

mongoose.Promise = global.Promise;
mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(()=> console.log('Connected to db'))
.catch(err => console.log(`db not connected ${err.message}`));