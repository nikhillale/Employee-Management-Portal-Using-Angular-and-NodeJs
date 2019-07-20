const express = require('express');

const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const employeeRoutes = require('./api/routes/employee');

mongoose.connect('mongodb+srv://nikhil:nikhil@node-rest-shop-6yene.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser:true
});


app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, GET, PATCH, DELETE'); 
        return res.status(200).json({});
    }
    next();
});
app.use('/upload',express.static('upload'));
app.use('/employee',employeeRoutes);

app.use((req, res, next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
})
app.use((error,req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        message : error.message
    })
})

module.exports=app;