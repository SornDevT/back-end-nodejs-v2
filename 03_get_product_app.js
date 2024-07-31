const express = require('express')
const app = express()

// ສ້າງເປັນ Class Product

class Product{
    constructor(id, name, price){
        this.id = id
        this.name = name 
        this.price = price
    }
}

// ສ້າງຂໍ້ມູນ array ສິນຄ້າ 

let products = [
    new Product(1,'Macbook Pro 2017', 6000),
    new Product(2,'Ipad 2017', 3000),
    new Product(3,'Acer V5', 1000),
    new Product(4,'All In One Acer', 9000),
    new Product(5,'Lenovo PC', 12000),
    new Product(6,'Dell', 14000),

]

/// get all products
app.get('/products',(req,res)=>{
    res.send(products)
})

// get by id
app.get('/product/:id',(req,res)=>{
    let id = req.params.id 
    let product = products.find((item)=> item.id == id)
    if(product){
        res.json(product)
    } else {
        res.status(404).send('Not Found')
    }
})

// get query string 
app.get('/search',(req,res)=>{
    let name = req.query.name
    let search_product = products.find((i)=>i.name == name)
    if(search_product){
        res.json(search_product)
    } else {
        res.status(404).send('Not Found')
    }
})

app.listen(3000, () => {
    console.log("Server Running Port:3000 on localhost")
})
