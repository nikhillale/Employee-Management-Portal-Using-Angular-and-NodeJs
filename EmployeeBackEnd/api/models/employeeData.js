const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstName : String,
    lastName : String,
    email : String,
    gender : String,
    age :  Number,
    salary : Number,
    Dob : Date,
    address :String,
    contactNumber :Number,
    hobbies :Array,
    states :String,
    cityes :String,
    pinCode :Number,
    profileimage: String,
    skills :Array
});

module.exports = mongoose.model('EmployeeData',EmployeeSchema);