const jwt = require('jsonwebtoken');

export function checkLogIn(req, res, next) {
    const token=req.header('auth-token');
    if(!token) {
        req.isLoggedIn=false;
        next();
    } else {
        jwt.verify(token,'secretkey', (err, authData) => {
            if(err){
                req.isLoggedIn=false;
                return res.json({success:false,message:err.message});
            } else {
                req.isLoggedIn=true;
                req.user=authData.user;
                next();
            }
        })
    }
}