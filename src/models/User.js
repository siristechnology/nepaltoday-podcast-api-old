const mongoose = require('../db')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"User name is required"]
    },
    profileImage: {
        type: String,
        // required: [true,"Profile image is required"]
    },
    firebaseUid: {
        type: String,
        required: [true, "Firebase uid is required"],
        unique: true
    },
    provider: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)