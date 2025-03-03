import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import User from '../models/user.model.js'

export const test = (req, res)=>{
    res.json({message:"contoller api is working"})
}



export const updateUser  = async(req, res, next)=>{
    console.log("requext user id", req.user.id);
    console.log("req params user id ",req.params.userId);
    if(req.user.id != req.params.userId){
        return next(errorHandler(403, "You are not allowed to update this user" ))

    }

    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler( 400, "Password must be at least 6 characters long"))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length>20){
            return next(errorHandler( 400, "Username must be between 7 and 20 characters long"))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, "Username cannot contain spaces"))
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'Username can only contain letters and numbers'))
        }


    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilePicture:req.body.profilePicture
            },
        },{new:true});
        if(!updatedUser){
            return next(errorHandler(404, "User not found"));
        }

        return res.status(200).json(updatedUser);
    }catch(error){
        console.log(error)
        next(error);
    }

   
}

export const deleteUser = async(req, res, next)=>{

    console.log("req id ", req.user.id, req.params.userId);
if(req.user.id!==req.params.userId ){
    return next(errorHandler(403, "You are not alloweed to delelte this user "));

}

try{
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({
        message: "User deleted successfully",

    })

}catch(error){
    next(error);

}

}

export const signout = (req, res, next)=>{
    try{
        res.clearCookie('access-token').status(200).json('User has Been Signed out');
        
    }catch(error){
        next(error);
    }
}