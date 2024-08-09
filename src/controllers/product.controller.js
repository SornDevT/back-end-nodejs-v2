
const fs = require('fs')
const path = require('path')

const multer = require('multer')
const multerConfig = require('../config/multer.config')
const upload_image = multer(multerConfig.config).single(multerConfig.keyUpload)

// import model
const ProductModel = require('../models/product.model')

/// get all products
exports.GetAllProduct = (req,res)=>{
    ProductModel.findAll((err, result) => {
        if(err) return res.status(500).json({success: false, message: err.message})
        res.json({success: true, result})
    })
}

// get by id
exports.GetProductById = (req,res)=>{
    let id = req.params.id 
    ProductModel.findById(id, (err, result) => {
        if(err) return res.status(500).json({success: false, message: err.message})
        res.json({success: true, result})
    })
}

// get query string 
exports.SearchProduct = (req,res)=>{
    let name = req.query.name
    ProductModel.search(name, (err,result) => {
        if(err) return res.status(500).json({success: false, message: err.message})
        res.json({success: true, result})
    })
}


// post add product 
exports.AddNewProduct = (req,res)=>{
    upload_image(req, res, (err) => {

         // ກວດວ່າມີ file ສົ່ງມາຫຼືບໍ່
         if(req.file){
            req.body.image = req.file.filename 
         } 

          if(Object.keys(req.body).length === 0){
            return res.status(400).json({success: false, message: 'Please fill all fiels!!!'})
          } else {
            let NewProduct = new ProductModel(req.body)
            ProductModel.create(NewProduct,(err,result) => {
                if (err)
                return res.status(500).json({success: false, message: err.message})
                res.status(201).json({success: true, message: 'Product Added',result})
            })
          }
    })
}

// pos upload image
exports.Upload = (req, res) =>{
    // console.log(req)
    // return res.send('upload')
    upload_image(req, res, (err) => {
        if(err){
            return res.status(400).json({success: false, message: err.message})
        }
        res.send('success!')
    }) 
}

// put update product by id
exports.UpdateProduct = (req,res)=>{

    upload_image(req, res, (err) => { // ກວດຊອບ ແລະ ອັບໂຫຼດໄຟລ໌ ໃໝ່

        if(err){
            return res.status(400).json({success: false, message: err.message})
        };

        let id = req.params.id

        if(req.file){ /// ຖ້າຫາກມີໄຟລ໌ ອັບໂຫຼດສົ່ງມາ

            ProductModel.findById(id, (err, result) => {
                if(err) return res.status(500).json({success: false, message: err.message})
                if(result.length > 0 && result[0].image) {
                    const filePath = path.join(__dirname,`../../uploads/${result[0].image}`)
                    if(fs.existsSync(filePath)){
                        fs.unlinkSync(filePath)
                    }
                }
            })
            req.body.image = req.file.filename
           
        } 
        let NewProduct = new ProductModel(req.body)
        ProductModel.update(id, NewProduct, (err,result) => {
            if (err)
                return res.status(500).json({success: false, message: err.message})
                res.json({success: true, message: 'Product Update',product: result})
        })

    })

}


// delete product by id

exports.DelProduct = (req,res)=>{
    let id = req.params.id

    // ຄົ້ນຫາຂໍ້ມູນ ແລະ ລຶບຮູບພາບ
    ProductModel.findById(id, (err, result) => {
        if(err) return res.status(500).json({success: false, message: err.message})
        if(result.length > 0 && result[0].image) {
            const filePath = path.join(__dirname,`../../uploads/${result[0].image}`)
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
        }
    })

    ProductModel.delete(id, (err,result) => {
        if (err)
            return res.status(500).json({success: false, message: err.message})
            res.json({success: true, message: 'Product Delete Success!'})
    })
   
}