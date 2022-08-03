const Route = require("express").Router();
const {check,validationResult} = require("express-validator")
const {users} = require("../db")
const bcrypt = require("bcrypt");
const {Router} = require("express")
const JWT = require("jsonwebtoken");

Route.post("/sign",[
    check("email","Please provide an valid email")
    .isEmail(),
    check("password","please provide password greaterthen 6 charecters")
    .isLength({
        min:6
    })
],
async (req,res)=>{
    const {email,password} = req.body
    console.log(email,password);
    const errs = validationResult(req)//checking whether any error in req
          if(!errs.isEmpty()){
           return res.status(400).json({
            errs:errs.array()
           });
          }
          let user= users.find((user)=>{
            return user.email === email;
           })
           if(user){
            return res.status(400).json({
                errs:[{
                    msg:"user is already existed"
                }]
               });
           }
           let hashpassword = await bcrypt.hash(password,10) // 10-salt round value
           users.push({email,password:hashpassword});

           const token = await JWT.sign(
            {email,},"abcdefskest",
            {expiresIn: 36000,}
           )
           res.json({token});
           console.log(hashpassword);
    res.send("Working...");
})

Route.get("/all",(req,res)=>{
    res.json(users);
})

module.exports = Route