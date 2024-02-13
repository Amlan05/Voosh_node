const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type: String, required:true},
    phone:{type: Number, required:true},
    password:{type: String, required: true}
})

exports.userModel = mongoose.model("User", userSchema)

// users