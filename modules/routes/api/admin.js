const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const Admin = require('../../../models/Admin')
const config = require('config');
//@route post api/admin
//@desc registerAdmin and 
//@access private
router.post(
    '/',
    [
        check('name','Name is required')
        .not()
        .isEmpty(),
        check("email", "Please include a valid email")
        .isEmail(),
		check(
			"password",
			"Please enter a password with 8 or more characters"
		).isLength({ min: 8 })
    ],
  async (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return(res.status(400)).json({errors:errors.array()})
        }
            const {name,email,password}= req.body;
            if(password !== '11111111'){
                return(res.status(400)).json({error:'password is not correct'})
            }
try{
    admin = new Admin({
        name,
        email,
        password
    });
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password,salt);
    await admin.save();
    const payLoad={
        admin:{
            id:admin.id
        }
    };
jwt.sign(payLoad,
config.get('jwtSecret'),
{expiresIn:360000},(err,token)=>{
if(err) throw err;
res.json({token})
}
);
  //  console.log(req.body)
  //  res.send("post");
}
catch(err){
  console.log(err.message);
  res.status(500).send('server error')  
}
        }
)

module.exports = router
