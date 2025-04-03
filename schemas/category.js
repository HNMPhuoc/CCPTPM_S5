let mongoose = require('mongoose');
let { createSlug } = require('../utils/slugHelper');
let categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        default:"",
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
// Middleware tự động tạo slug trước khi lưu
categorySchema.pre('validate', function (next) {
    if (!this.slug || this.isModified('name')) {
        this.slug = createSlug(this.name);
    }
    next();
});
module.exports = mongoose.model('category',categorySchema)
// products