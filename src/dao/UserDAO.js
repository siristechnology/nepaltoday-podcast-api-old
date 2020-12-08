const User = require('./../models/User')

exports.create = async (data) => {
    try{
        const userObj = new User(data)
        return await userObj.save()
    } catch(err) {
        throw err
    }
}

exports.read = async () => {
    try {
        return await User.find()
    } catch (err) {
        throw err
    }
}

exports.readbyUid = async (firebaseUid) => {
    try {
        return await User.findOne({firebaseUid})
    } catch (err) {
        throw err
    }
}