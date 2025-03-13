let mongoose = require('mongoose');
let productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        default:0,
        required:true,
        min:0
    },
    description:{
        type:String,
        default:"",
    },
    urlImg:{
        type:String,
        default:"",
    },
    category:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
module.exports = mongoose.model('product',productSchema)