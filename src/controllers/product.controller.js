
const fs = require('fs')
const path = require('path')

const multer = require('multer')
const multerConfig = require('../config/multer.config')
const upload_image = multer(multerConfig.config).single(multerConfig.keyUpload)

// ສ້າງເປັນ Class Product

class Product{
    constructor(id, name, price, image){
        this.id = id
        this.name = name 
        this.price = price
        this.image = image
    }
}


// ສ້າງຂໍ້ມູນ array ສິນຄ້າ 

let products = [
    new Product(1,'Macbook Pro 2017', 6000,''),
    new Product(2,'Ipad 2017', 3000,''),
    new Product(3,'Acer V5', 1000,''),
    new Product(4,'All In One Acer', 9000,''),
    new Product(5,'Lenovo PC', 12000,''),
    new Product(6,'Dell', 14000,''),
]




/// get all products
exports.GetAllProduct = (req,res)=>{
    res.send(products)
}

// get by id
exports.GetProductById = (req,res)=>{
    let id = req.params.id 
    let product = products.find((item)=> item.id == id)
    if(product){
        res.json(product)
    } else {
        res.status(404).send('Not Found')
    }
}

// get query string 
exports.SearchProduct = (req,res)=>{
    let name = req.query.name
    let search_product = products.find((i)=>i.name == name)
    if(search_product){
        res.json(search_product)
    } else {
        res.status(404).send('Not Found')
    }
}


// post add product 
exports.AddNewProduct = (req,res)=>{
    // res.send(req.body)
    // console.log(products.length)

    upload_image(req, res, (err) => {

        // console.log(req.file.filename)

        if(err){
            return res.status(400).json({message: err.message})
        }

        if(req.file){
       
            let id = products.length + 1
            let name = req.body.name
            let price = req.body.price
            let new_product = new Product(id, name, price, req.file.filename)
            // ເພີ່ມເຂົ້າໃນ array products
          products.push(new_product)
          res.status(201).json(new_product)
          

        } else {

            let id = products.length + 1
            let name = req.body.name
            let price = req.body.price
            let new_product = new Product(id, name, price,'')
            // ເພີ່ມເຂົ້າໃນ array products
          products.push(new_product)
          res.status(201).json(new_product)
        }

          

    })
}

// pos upload image
exports.Upload = (req, res) =>{
    // console.log(req)
    // return res.send('upload')
    upload_image(req, res, (err) => {
     
        if(err){
            return res.status(400).json({message: err.message})
        }
        res.send('success!')
    }) 

}

// put update product, get by param
exports.UpdateProduct = (req,res)=>{

    upload_image(req, res, (err) => { // ກວດຊອບ ແລະ ອັບໂຫຼດໄຟລ໌ ໃໝ່

        // console.log(req.file.filename)
        if(err){
            return res.status(400).json({message: err.message});
        };
        const index = products.findIndex(item => item.id ==  req.params.id); // ເອົາ id ໄປຄົ້ນຫາ index ຂອງຂໍ້ມູນ

        if(req.file){ /// ຖ້າຫາກມີໄຟລ໌ ອັບໂຫຼດສົ່ງມາ
            if(products[index].image){ /// ກວດເບີ່ງວ່າ ມີູຮບໃຮ product ບໍ່
                const filePath = path.join(__dirname, `../../uploads/${products[index].image}`)
                const fs = require("fs");
                // ລຶບຮູບພາບ
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                } 
            }
        } 
        if(index >= 0){

            // ຮັບຂໍ້ມູຍແບບໃໝ່
            const { name, price } = req.body
                // ອັບເດດຂໍ້ມູນ
                products[index].name = name
                products[index].price = price
                // ແບບ 1 ---------------------------------
                // products[index].image = req.file?req.file.filename:products[index].image // ຂຽນ if else ແບບຫຍໍ້

                // ແບບ 2 --------------------------------
                if(req.file){
                    products[index].image = req.file.filename
                }
                res.json(products)

        } else {
            res.status(404).send('Not Found!')
        }
           

        
    
    })

}


// delete product by id

exports.DelProduct = (req,res)=>{
    let id = req.params.id
    const index = products.findIndex((i)=>i.id==id)
    // console.log(index)
    if(index>-1){
        // ກວດຮູບພາບ ແລະທຳການ ລຶບຮູບພາບກ່ອນ
            if(products[index].image){ /// ກວດເບີ່ງວ່າ ມີູຮບໃຮ product ບໍ່
                const filePath = path.join(__dirname, `../../uploads/${products[index].image}`)
                // ລຶບຮູບພາບ
                
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath)
                    } 
            }


        // ລຶບຂໍ້ມູນ
        products.splice(index,1)
        res.json(products)
    } else {
        res.status(404).send('Not Found!')
    }
}