const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    qid: {
        type: String,
        required: true,
        unique: true,
    },
    op_1: {
        type: String,
        required: true,
    },
    op_2: {
        type: String,
        required: true,
    },
    op_3: {
        type: String,
        required: true,
    },
    op_4: {
        type: String,
        required: true,
    },
    ans: {
        type: String,
        required: true,
    },
})

const Question = new mongoose.model("Questions", questionSchema);

module.exports = Question;