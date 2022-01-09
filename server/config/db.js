const mongoose = require('mongoose');

const DB = process.env.USER_DB;

mongoose.connect(DB, { useNewUrlParser: true, wtimeoutMS: 2500 })
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ', err))