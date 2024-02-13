
const User = require('../Model/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;
// user register
exports.userRegister = async(req, res) => {

    const {name, phone, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10);

    let user

    try{
        let existingUser = await User.userModel.findOne({phone:phone})

        if(existingUser){
            return res.status(400).json({message: "User already exist"})
        }

        user = new User.userModel({
            name:name,
            phone:phone,
            password:hashedPassword
        });

        if (!user) {
            return res.status(400).json({ message: "Error occured" });
          }

        user = await user.save()
        const token = jwt.sign({phone: user.phone, id: user._id}, SECRET_KEY)
        return res.status(201).json({message: "User successfully created", user, token:token})

    }
    catch(err){
        return res.status(500).json({message: 'Some error occured'})
    }
    
    
}


// login user

exports.loginUser = async(req, res) => {
    const {phone, password} = req.body;

    let existingUser
    try{
        existingUser = await User.userModel.findOne({phone})

        if(!existingUser){
            return res.status(404).json({message: "No user found, Signup Instead"})
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
        if(!isPasswordCorrect){
          return  res.status(401).json({message: "Incorrect Password"})
        }

        const token = jwt.sign({phone: existingUser.phone, id: existingUser._id}, SECRET_KEY)
        return res.status(200).json({message: "Login Successful", user:existingUser, token: token})

      }
      catch(err){
        return console.log(err)
      }
    
    
}

exports.getUsers = async(req, res) => {
    let users
    const {userId} = req.params.id
    try{
        users = await User.userModel.find(userId);
    }
    catch(err){
        return res.status(500).json({message: "Internal server error"})
    }
    if(!users){
        return res.status(404).json({message: "No users found"})
    }
    return res.status(200).json({users})
}