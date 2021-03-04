import { user } from "./user.model";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { loginValidation,registerValidation } = require('../../../helpers/auth.validation');

export default {
    registerUser(req, res){
        const err=registerValidation(req.body);
        if(err){
            return res.json({success:false,message:err.message});
        }
        user.findOne({email:req.body.email}, (err,checkUser) => {
            if(err){
                return res.json({success:false,message:err.message});
            }
            if(checkUser){
                return res.json({success:false,message:"Email already exists"});
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password,salt, (err, hashpassword) => {
                        req.body.password=hashpassword;
                        let newUser = new user(req.body);
                        newUser.save((err, registeredUser) => {
                            if(err){
                                return res.json({success:false,message:err.message});
                            }
                            jwt.sign({registeredUser},'secretkey', {expiresIn: '30d'}, (err, token) => {
                                if(err){
                                    return res.json({success:false,message:err.message});
                                }
                                res.header('auth-token',token).json({success:true,message:"Registered and Logged in",token,data:registeredUser});
                            });
                        });
                    })
                });
            }
        });    
    },
    
    loginUser(req, res, next){
        const err=loginValidation(req.body);
        if(err){
            return res.json({success:false,message:err.message});
        }
        user.findOne({email:req.body.email}, (err,loginUser) => {
            if(err){
                return res.json({success:false,message:err.message});
            }
            if(!loginUser){
                return res.json({success:false,message:'Email does not exists'});
            } else {
                bcrypt.compare(req.body.password, loginUser.password, function(err, result) {
                    if(err){
                        return res.json({success:false,message:err.message});
                    }
                    if(!result){
                        return res.json({success:false,message:'Password is not valid'});
                    }
                    jwt.sign({loginUser},'secretkey', {expiresIn: '30d'}, (err, token) => {
                        if(err){
                            return res.json({success:false,message:err.message});
                        }
                        res.header('auth-token',token).json({success:true,message:"Logged in",token,data:loginUser});
                    });
                });
            }
        })
    },
}