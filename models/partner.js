const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        require: true,
    },
    featured: {
        require: false,
    },
    description: {
        type: String,
        require: true,
    },
    }, 
    
    {
        timestamp: true

})

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;