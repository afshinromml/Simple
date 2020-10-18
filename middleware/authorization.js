var jwt = require('jsonwebtoken');
const config = require('config');
module.exports =  (req,res,next)=>{
   // const token = req.headers('x-auth-token');
   // const token= req.header('x-token');
   var token = ''
   var token2 = ''
   var getToken = ''
    token = req.headers['x-auth-token'];
 console.log(req.headers);
 if(!req.body){
    token2 = req.body.headers['x-auth-token'];
 }
 //const token2 = req.body.headers['x-auth-token'];

if(!token){
  getToken = token2
}

if(!token2){
   getToken = token
}

console.log(getToken)
    if(!getToken){
     return(res.status(401).json({
    message:'token does not exist'
}))
    }else{
        // return(res.status(200).json({
        //     message:{token}
        // }))
        try {
            var decodedToken = jwt.verify(getToken, config.get('jwtSecret'));
         //   console.log(decodedToken.user)
         req.user = decodedToken.user

         //console.log(req.user)
            next()
           
        // return(res.status(200).json({
        //     message:decodedToken.user
        // }))

          } catch(err) {
            console.log(err.message)

            return(res.status(401).json({
                message:err.message
            }))
          }

    }

}
