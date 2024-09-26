const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    minScore: {
        type: Number,
        required: true
    },
    maxScore: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Result', resultSchema);
