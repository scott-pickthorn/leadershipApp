var mongoose = require('mongoose');
var Schema = mongoose.schema;

var userSchema = new Schema({
    username: String,
    password: String,
    id: String,
    admin: Boolean,
    profile: {
        assignments: [{
            id: String,
            mentorId: String,
            title: String,
            type: String,
            description: String,
            start: {type: Date, default: Date.now},
            status: String, 
            dueDate: Date,
        }]
    }
});