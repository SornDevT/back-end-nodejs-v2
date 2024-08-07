
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
            return result(null, res.insertId)
        }
    })


}


module.exports = Product