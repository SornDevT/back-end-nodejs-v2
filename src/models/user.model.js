const dbConn = require('../config/db.config')
const bcrypt = require('bcrypt')


class User{
    constructor(user){
        this.id = user.id
        this.name = user.name 
        this.email = user.email
        this.password = user.password
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

User.create = (newUser, result) => {
    // create product table if not exits
    dbConn.query('CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)', (err,res) => {
        if(err) {
            return result(err, null)
        }
    })

    if(!newUser.password) return result({message: 'Password is required'},null)
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            newUser.password = hash

            // add user
            dbConn.query('INSERT INTO users SET ?', newUser, (err, res) => {
                if(err) return result(err, null)
                result(null, res.insertId)
            })

        })
    })
    
}

// get all product 
User.findAll = (result) => {
    dbConn.query('SELECT * FROM users', (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}

// get product by id
User.findById = (id, result) => {
    dbConn.query('SELECT * FROM users WHERE id = ?', id, (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}

// search by name
User.search = (name, result) => {
    dbConn.query('SELECT * FROM users WHERE name LIKE ?', [`%${name}%`], (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}

// update product by id
User.update = (id, user, result) => {

        dbConn.query('UPDATE users SET name=?, email=?, password=? WHERE id=?', [user.name, user.email, user.password, id], (err,res)=>{
            if(err) return result(err,null)
             // result(null,res)    
            // get all product
            dbConn.query('SELECT * FROM users', (err,res)=>{
                if(err) return result(err,null)
                result(null,res)
            })
           
        })

}

// delete product by id
User.delete = (id, result) => {
    dbConn.query('DELETE FROM users WHERE id=?', id, (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}


module.exports = User