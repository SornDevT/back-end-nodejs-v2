const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{

        const token = req.headers.authorization.split(' ')[1]
        // console.log(token)
        if(!token) return res.status(401).json({message:'Auth fail'})
        const decode = jwt.verify(token,'my-ptivate-key')

        console.log('global-blacklist:'+global.blacklist)
        if(global.blacklist.includes(token)) return res.status(401).json({message:'Unauthenticated'})

        next()

    } catch (err){
        return res.status(401).json({message:'token expire or Unauthenticated'})
    }
}