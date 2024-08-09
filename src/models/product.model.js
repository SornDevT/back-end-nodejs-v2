
const dbConn = require('../config/db.config')


class Product{
    constructor(product){
        this.id = product.id
        this.name = product.name 
        this.price = product.price
        this.image = product.image
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

Product.create = (newProduct, result) => {
    // create product table if not exits
    dbConn.query('CREATE TABLE IF NOT EXISTS products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price INT, image VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)', (err,res) => {
        if(err) {
            return result(err, null)
        }
    })
    // add new product
    dbConn.query('INSERT INTO products SET ?', newProduct, (err, res) => {
        if(err){
            return result(err, null)
        } else {
            // return result(null, res)
            return result(null, res.insertId)
        }
    })
}

// get all product 
Product.findAll = (result) => {
    dbConn.query('SELECT * FROM products', (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}

// get product by id
Product.findById = (id, result) => {
    dbConn.query('SELECT * FROM products WHERE id = ?', id, (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}

// search by name
Product.search = (name, result) => {
    dbConn.query('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`], (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}

// update product by id
Product.update = (id, product, result) => {
    if(product.image){
        dbConn.query('UPDATE products SET name=?, price=?, image=? WHERE id=?', [product.name, product.price, product.image, id], (err,res)=>{
            if(err) return result(err,null)
             // result(null,res)    
            // get all product
            dbConn.query('SELECT * FROM products', (err,res)=>{
                if(err) return result(err,null)
                result(null,res)
            })
           
        })
    } else {
        dbConn.query('UPDATE products SET name=?, price=? WHERE id=?', [product.name, product.price, id], (err,res)=>{
            if(err) return result(err,null)
             // result(null,res)    
            // get all product
            dbConn.query('SELECT * FROM products', (err,res)=>{
                if(err) return result(err,null)
                result(null,res)
            })
           
        })
    }
    
}

// delete product by id
Product.delete = (id, result) => {
    dbConn.query('DELETE FROM products WHERE id=?', id, (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}


module.exports = Product