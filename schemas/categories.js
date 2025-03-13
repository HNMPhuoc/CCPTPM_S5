const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        default: "" 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Category', categorySchema);
