const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, 'Please add a text field']
    },
    tag:{
        type: String,
        required: [true, 'Please add a tag field']
    },
    username:{
        type: String,
        required: [true, 'Please add a username field']
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Idea', IdeaSchema);