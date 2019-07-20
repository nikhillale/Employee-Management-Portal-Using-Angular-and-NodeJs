const mongoose = require("mongoose");

const tokenSchema= mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    token: String,  
})

module.exports = mongoose.model('tokenSchema',tokenSchema);