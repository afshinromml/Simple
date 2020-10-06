const express = require('express')
const router = express.Router();
const authorization = require('../../../middleware/authorization')
const User = require('../../../models/Users')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator");
const config = require('config');
const jwt = require('jsonwebtoken');
//@route get api/auth
//@desc test route
//@access public 
router.get('/',authorization,async(req,res)=>{

    try{
console.log(req.user)
        let userFindByToken = await (await User.findById(req.user.id).select('-password'))
                return(res.status(200).json({
            message:userFindByToken
        })) 
    }catch(err) {
        console.log(err.message)

        return(res.status(401).json({
            message:err.message
        }))
      }
})

//@route post api/auth
//@desc loginUser
//@access public 
router.post(
    '/',
    [
        check("email", "Valid email is required")
        .isEmail(),
        check("firma","Company name is required")
        .not()
        .isEmpty(),
		check(
			"password",
			"You have to write password"
		).exists()
    ],
  async (req,res)=>{
    const {email,firma,password}= req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return(res.status(400)).json({errors:errors.array()})
        }
           
try{
    let user = await User.findOne({ firma });
   
    if(!user){
        return(res.status(400).json({errors:[{msg:'Company is not valid'}]}))
        
    }

let matchPassword = await bcrypt.compare(password,user.password)
if(!matchPassword){
    return(res.status(400).json({errors:[{msg:'password is not valid'}]}))
}

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
