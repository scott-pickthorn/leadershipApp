const mongoose = require('mongoose');
const Schema = mongoose.schema;

const userSchema = new Schema({
    username: String,
    password: String,
    id: String,
    profile: {
        mentorId: String,
        admin: Boolean,
        assignments: [{
            id: String,
            title: String,
            type: String,
            description: String,
            start: { type: Date, default: Date.now },
            status: String,
            dueDate: Date,
        }]
    }
});