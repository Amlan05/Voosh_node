
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOrder = new Schema({
    userId:{type: mongoose.Types.ObjectId, ref: "User"},
    phone:{type: Number, ref: "User"},
    sub_total:{type: Number, required:true}
})

exports.orderModel = mongoose.model('Order', userOrder)

// orders