const {Schema, model} = require('mongoose');

const advertisementSchema = new Schema({
    
    shortText: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,        
    },
    
    images: {
        type: [String],        
    },
    
    userId: {
        type: String,
        required: true,        
    },
    
    createdAt: {
        type: Date,        
        required: true,
    },
    
    updatedAt: {
        type: Date,        
        required: true,
    },

    tags: {
        type: [String], 
    },

    isDeleted: {
        type: Boolean,
        required: true,
    }
});

module.exports = model('Advertisement', advertisementSchema);