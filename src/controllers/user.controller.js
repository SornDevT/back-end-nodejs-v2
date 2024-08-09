

const UserModel = require('../models/user.model')

exports.GetAllUser = (req,res)=>{
    UserModel.findAll((err, result) => {
        if(err) return res.status(500).json({success: false, message: err.message})
        res.json({success: true, result})
    })
}

exports.GetUserById = (req,res)=>{
    let id = req.params.id 
    UserModel.findById(id, (err, result) => {
        if(err) return res.status(500).json({success: false, message: err.message})
        res.json({success: true, result})
    })
}


exports.SearchUser = (req,res)=>{
    let name = req.query.name
    UserModel.search(name, (err,result) => {
        if(err) return res.status(500).json({success: false, message: err.message})
        res.json({success: true, result})
    })
}


exports.AddNewUser = (req,res)=>{

        // console.log(req.body)
          if(Object.keys(req.body).length === 0){
            return res.status(400).json({success: false, message: 'Please fill all fiels!!!'})
          } else {
            let NewUser = new UserModel(req.body)
            UserModel.create(NewUser,(err,result) => {
                if (err)
                return res.status(500).json({success: false, message: err.message})
                res.status(201).json({success: true, message: 'User Added',result})
            })
          }
   
}


exports.UpdateUser = (req,res)=>{

        let id = req.params.id
        let NewUser = new UserModel(req.body)
        UserModel.update(id, NewUser, (err,result) => {
            if (err)
                return res.status(500).json({success: false, message: err.message})
                res.json({success: true, message: 'Product Update',product: result})
        })
}


exports.DelUser = (req,res)=>{
    let id = req.params.id

    UserModel.delete(id, (err,result) => {
        if (err)
            return res.status(500).json({success: false, message: err.message})
            res.json({success: true, message: 'User Delete Success!'})
    })
   
}