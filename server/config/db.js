const mongoose = require('mongoose');

const DB = process.env.LOCAL_USER_DB;

mongoose.connect(DB, { useNewUrlParser: true, wtimeoutMS: 2500 })
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ', err))