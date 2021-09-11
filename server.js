//require('dotenv').config();
const express =  require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const router = require('./routes/tax');
const autthRoute = require('./routes/user');

mongoose.connect('mongodb://localhost:27017/taxAmt')
mongoose.connection.once('open', () => {
    console.log('conncted to db')
})

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/a', router);
app.use('/user', autthRoute)
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})