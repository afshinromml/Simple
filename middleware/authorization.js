var jwt = require('jsonwebtoken');
const config = require('config');
module.exports =  (req,res,next)=>{
   // const token = req.headers('x-auth-token');
   // const token= req.header('x-token');
   const token = req.headers['x-auth-token'];

 console.log(req.headers);
 
    if(!token){
     return(res.status(401).json({
    message:'token does not exist'
}))
    }else{
        // return(res.status(200).json({
        //     message:{token}
        // }))
        try {
            var decodedToken = jwt.verify(token, config.get('jwtSecret'));
         //   console.log(decodedToken.user)
         req.user = decodedToken.user
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
