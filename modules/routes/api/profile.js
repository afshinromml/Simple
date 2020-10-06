const express = require('express')
const router = express.Router();
const { check, validationResult } = require("express-validator");
const adminAuthorization = require('../../../middleware/adminAuthorization');
const authorization = require('../../../middleware/authorization')
const Samples = require('../../../models/Samples')

//@route get api/profile/me
//@desc Get current users Profile
//@access Private
router.get('/me',authorization,async (req,res)=>{

    try{
      // const sample = await Samples.findOne({user:req.user.id})
    //  const sample = await Samples.findOne({bachNumber:req.body.bachNumber})
let x1= req.headers['body']
let x2 = JSON.parse(x1)
let x3 = x2['bachNumber']
      sample = await Samples.findOneAndUpdate(
      {bachNumber: x3},
        {user:req.user.id},
      //  {$set:sampleField},
        {new:true}
    )

    return (res.json(sample))
       //req.body.bachNumber
       if(!sample){
           return res.status(400).json({msg:'No sample for this user'})
       }
       res.json(sample)
    }
    catch(err){
    //    console.log(err.message);
        res.status(500).send(err.message)  
      }
}
)

//@route post api/profile/
//@desc create or update current users Profile
//@access Private
router.post('/',[adminAuthorization,[
    check('product','Product is required')
    .not()
    .isEmpty(),
    check('bachNumber','bachNumber is required')
    .not()
    .isEmpty(),
    check('lotNumber','lotNumber is required')
    .not()
    .isEmpty(),
    check('CPercent','CPercent is required')
    .not()
    .isEmpty(),
    check('MnPercent','MnPercent is required')
    .not()
    .isEmpty(),
    check('Spercent','Spercent is required')
    .not()
    .isEmpty(),
    check('Ppercent','Ppercent is required')
    .not()
    .isEmpty(),
    check('UTS','UTS is required')
    .not()
    .isEmpty(),
    check('Yield','Yield is required')
    .not()
    .isEmpty(),
    check('Elongation','Elongation is required')
    .not()
    .isEmpty(),
    check('Impact','Impact is required')
    .not()
    .isEmpty()
]],async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return(res.status(400)).json({errors:errors.array()})
    }

    let sampleField = {};
    sampleField.admin = req.admin.id
        const {product,bachNumber,lotNumber,CPercent,MnPercent,Ppercent,
            Spercent,Yield,Impact,UTS,Elongation
        }= req.body;

if (product) sampleField.product = product
if (bachNumber) sampleField.bachNumber = bachNumber
if (lotNumber) sampleField.lotNumber = lotNumber
if (CPercent) sampleField.CPercent = CPercent
if (MnPercent) sampleField.MnPercent = MnPercent
if (Ppercent) sampleField.Ppercent = Ppercent
if (Spercent) sampleField.Spercent = Spercent
if (Yield) sampleField.Yield = Yield
if (Impact) sampleField.Impact = Impact
if (UTS) sampleField.UTS = UTS
if (Elongation) sampleField.Elongation = Elongation

    try{
       var sample = await Samples.findOne({admin:req.admin.id})
     // var sample = await Samples.findOne({bachNumber:bachNumber})

       if(sample){
sample = await Samples.findOneAndUpdate(
    {admin:req.admin.id},
    {$set:sampleField},
    {new:true}
)
return (res.json(sample))
       }else{
           sample = new Samples(sampleField)
           await sample.save()
           return (res.json(sample))
       }
    }
    catch(err){
    //    console.log(err.message);
        res.status(500).send(err.message)  
      }
}
)
module.exports = router