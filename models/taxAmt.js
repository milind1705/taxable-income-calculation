const mongoose = require('mongoose');
const taxAmtSchema = mongoose.Schema({
    basic:{
        type: Number,
        required:true
    },
    lta:{
        type: Number,
        required:true
    },
    hra:{
        type: Number,
        required:true
    },
    fa:{
        type: Number,
        required:true
    },
    INV:{
        type: Number,
        required:true
    },
    rent:{
        type: Number,
        required:true
    },
    cityType:{
        type: String,
        required:true
    },
    med:{
        type: Number,
        required:true
    },
    appHra:{
        type:Number
    },
    taxInc:{
        type:Number
    }

})
module.exports = mongoose.model("TaxInc", taxAmtSchema)