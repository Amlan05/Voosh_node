 
 const Order = require('../Model/Order')


//  add order
exports.orderAdd = async(req, res) => {
    const {user_id, phone_number, sub_total} = req.body
    let prdt
    try{
        prdt = new Order.orderModel({
            userId: user_id,
            phone:phone_number,
            sub_total:sub_total
        })
        prdt = await prdt.save()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: 'Some error occured'})
    }
    if(!prdt){
        return res.status(409).json({message: "Could not add Blog"})
    }
    return res.status(200).json({prdt, message:"Order added successfully"})
}

// get order detail
exports.getOrderDetail = async(req, res) => {
    let orders
    const {userId} = req.query
    try{
        orders = await Order.orderModel.find({userId})
    }
    catch(err){
        return res.status(500).json({message: 'Some error occured'})
    }
    if(!orders){
        return res.status(404).json({message: "No Orders found with this id"})
    }
    return res.status(200).json({orders})
}

// get all orders
exports.getAllOrders = async(req, res) => {
    let orders
    try{
        orders = await Order.orderModel.find();
    }
    catch(err){
        return res.status(500).json({message: "Some error occured"})
    }
    if(!orders){
        return res.status(404).json({message: "No orders found"})
    }
    return res.status(200).json({orders})
}