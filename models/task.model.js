const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})
const taskModel = mongoose.model("Task", taskSchema);
module.exports = taskModel;
