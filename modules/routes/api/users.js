const express = require('express')
const router = express.Router();
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const User = require('../../../models/Users')
const config = require('config');
//@route get api/users
//@desc registerUser
//@access public 
router.post(
    '/',
    [
        check('name','Name is required')
        .not()
        .isEmpty(),
        check("email", "Please include a valid email")
        .isEmail(),
        check("firma","Please write name of your company")
        .not()
        .isEmpty(),
        check("faxNumber","Please enter your fax number")
        .not()
        .isEmpty(),
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
            const {name,email,firma,faxNumber,password}= req.body;
try{
    let user = await User.findOne({ firma });
   
    if(user){
        res.status(400).json({errors:[{msg:'Company already registered'}]})
    }
	let avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    });
    user = new User({
        name,
        email,
        avatar,
        password,
        firma,
        faxNumber
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    await user.save();
    const payLoad={
        user:{
            id:user.id
        }
    };
jwt.sign(payLoad,
config.get('jwtSecret'),
{expiresIn:360000},(err,token)=>{
if(err) throw err;
res.json({token})
}
);
    console.log(req.body)
  //  res.send("post");
}
catch(err){
  console.log(err.message);
  res.status(500).send('server error')  
}
        }

)

module.exports = router
