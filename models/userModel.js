const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    phone: {
        type: String,
        required: [true, "Please enter your number"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
},
    {
        timestamps: true
    }
)

const User = mongoose.model('User' , userSchema);

module.exports = User