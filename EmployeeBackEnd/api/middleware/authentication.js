const jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(401).json({message : 'unauthorized user'})
    }
    console.log(req.headers.authorization);
    
    let token = req.headers.authorization.split(' ')[1]
     console.log(token);
    
    if(token == 'null'){
        return res.status(401).json({message : 'unauthorized user'})
    }
    let payload = jwt.verify(token, 'nikhil');
    if(!payload){
        res.status(401).json({message : 'unauthorized user'})
    }
    req.email= payload.subject;
    next()
}
