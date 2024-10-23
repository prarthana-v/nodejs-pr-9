const { json } = require('express');
const UserModel = require('../models/authModel')
const nodemailer = require('nodemailer')
const postEmail = async(req,res) =>{
    try {
        console.log(req.body.forgotemail);
     const email = req.body.forgotemail;
     const user = await UserModel.findOne({email:email})
     if(!user){
         res.status(400).send({
            success: true,
            message: "Email not found"
    
        })
        }
        let otp = Math.floor(Math.random() * 10000);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'khushbuzalavadiya8@gmail.com',
                pass: 'ntbi tuff qqdz mnwm'
            }
        });

        var mailOptions = {
            from: 'khushbuzalavadiya8@gmail.com',
            to: email,
            subject: 'Send Otp',
            html: `<h1>Hello ${user.name} Your Otp :- ${otp}</h1>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {

                console.log('Email sent: ' + info.response);
                let obj = {
                    email: email,
                    otp: otp
                }
                res.cookie('otp',obj); // Set secure to true in production

                res.status(200).send({
                    success: true,
                    message: "Otp sent to your email"
                })
            }
        })
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })  
    }
}
const postOtp = async(req,res) =>{
    try {
        let otp = req.body.otp;
        // let cookie = req.cookies.otp;
        if (req.cookies.otp.otp == otp) {
         return res.status(200).send({
                success: true,
                message: "Otp is correct"
                })
                } else {
                  return res.status(200).send({
                        success: false,
                        message: "Otp is incorrect"
                        })
            
                    }
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error
        })  
    }
}
const postNewPass = async (req, res) => {
    try {
        const { newpass, cpass } = req.body
        const email = req.cookies.otp.email
        // console.log(req.body);
        if (newpass == cpass) {
            await UserModel.findOneAndUpdate({ email: email }, {
                password: newpass
            });
            res.clearCookie('otp');
            return res.status(200).send({
                success: true,
                message: "Password updated successfully"
                })

            
        } else {
            console.log("Password and Confirm Password are not same");
            return res.status(200).send({
                success: false,
                message: "Password and Confirm Password are not same"
                })
        }

    } catch (error) {
       res.status(500).send({
        success: false,
        message: error
        })

    }}
module.exports = {postEmail,postOtp,postNewPass};