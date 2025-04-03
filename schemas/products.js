let mongoose = require('mongoose');
let { createSlug } = require('../utils/slugHelper');
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
        type:mongoose.Types.ObjectId,
        ref:'category',
        required:true
    },
    slug: {
        type: String,
        required: false,
        unique: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});
productSchema.pre('validate', function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = createSlug(this.name);
    }
    next();
});
module.exports = mongoose.model('product',productSchema)
// products