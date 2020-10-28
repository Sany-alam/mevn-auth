
const jwt = require('jsonwebtoken')
// const passport = require('passport')
const User = require('../models/user')

exports.profile = (request,response) => {
    return response.status(200).json({user:request.user});
}

exports.login = (request,response) => {
    User.findOne({ email:request.body.email }).exec((error,user) =>{
        if (user) {
            if (user.authenticate(request.body.password)) {
                const _user = { _id:user._id,name:user.name,email:user.email};
                const token = jwt.sign(_user, process.env.JWT_SECRET, {expiresIn: '6d'})
                return response.status(200).json({
                    message: 'Successfully login',
                    token: token,
                    success: true,
                    user:_user
                });

            }else return response.status(401).json({
                message: 'Invalid credentials',
                success: false,
            });
        }
        if (error) return response.status(401).json({
            error: error,
        });
        return response.status(401).json({
            message: 'Invalid credentials',
            success: false
        })
    })
}

exports.signup = (req,res) => {
    User.findOne({ email:req.body.email }).exec((error,email) => {
        if (email) return res.status(400).json({
            message: 'Email is already registered! Did you forgot your password?',
            data: error
        })

        const _user = new User({name:req.body.name,email:req.body.email,password:req.body.password})
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: 'Something went wrong',
                    data: error,
                    success: false
                });
            }
            if (data) {
                return res.status(201).json({
                    message: 'User created successfully.',
                    data: data,
                    success: true
                });
            }
        });

    })

}