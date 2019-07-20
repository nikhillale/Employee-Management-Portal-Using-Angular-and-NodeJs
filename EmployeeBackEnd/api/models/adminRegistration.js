const mongoose = require("mongoose");

const adminSchema= mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    email: String,
    password: String
})

module.exports = mongoose.model('adminSchema',adminSchema);