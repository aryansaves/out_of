import gentoken from "../utils/generateToken.js";
import User from "../models/User.js";


const register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;
    
        const user = await User.create({
            username,
            email,
            password
        })
        const token = gentoken(user._id)
        
        res.status(201).json({
            success : true,
            token
        })
    } catch(error){
        if(error.code === 11000){
            return res.status(400).json({
                success : false,
                message : "Already registered !"
            })
        } next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = gentoken(user._id)
            res.status(200).json({
            success: true,
            token
            });
    }catch(error) {
        next(error)
    }
}

export default {register, login} 