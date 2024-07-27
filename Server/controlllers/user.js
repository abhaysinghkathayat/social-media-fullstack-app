import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modals/user.js";

export const signIn = async(req,res) =>{
    const {email,password} = req.body;
    try {
    const userExist =await User.findOne({ email });
    if (!userExist) return res.status(404).json({ message:'User Not Found'});
    const correctPassword = await bycrypt.compare(password, userExist.password);
    
    if (!correctPassword) return res.status(400).json({message:"Invalid Credentials"});
   const token = jwt.sign({email:userExist.email,id:userExist._id},'test',{expiresIn:"1h"});
   console.log(token);
   res.status(200).json({result:userExist,token});
    } catch (error) {
      res.status(500).json({message:"Something Went Wrong"});
    }
   
}


export const signUp = async(req,res)=>{
    const {email,password,confirmPassword,firstName,lastName} = req.body;
    console.log(email, password, confirmPassword, firstName, lastName);
    try {
        const userExist =await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: 'User Already Exist' });
        if (password !== confirmPassword) return res.status(400).json({message:"Password Dont Match"});

        //hasing the password 
        const hashPassword = await bycrypt.hash(password,12);
        const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result, token })


    } catch (error) { 
        res.status(500).json({ message: "Something Went Wrong" });
    }
}