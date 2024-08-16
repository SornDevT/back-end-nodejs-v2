const dbConn = require('../config/db.config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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

// login 
User.login = (user, result) => {

    dbConn.query('SELECT * FROM users WHERE email =?', user.email, (err,res)=>{
        if(err) return result(err, null)
        // console.log(res.length)
        if(res.length == 0) return result({message: 'ອີເມວລ໌ນີ້ ບໍ່ມີໃນລະບົບ'},null)
        if(!user.password) return result({message: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ'},null)
            console.log(user.password)
            console.log(res[0].password)

        bcrypt.compare(user.password, res[0].password, (err,isMatch) => {
            console.log(isMatch)
                if(!isMatch) return result({message: 'ອີເມວລ໌ນີ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖຶກຕ້ອງ'},null)
                const token = jwt.sign({id:res[0].email},'my-ptivate-key',{ expiresIn: '1h'})
                return result(null, token)
            })
        
        
    })
}

// logout

User.logout = (req, result) => {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token,'my-ptivate-key', (err, decode)=>{
        global.blacklist.push(token)
        result(null,decode)
    })
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

            // check duplicates email
            dbConn.query('SELECT COUNT(*) AS count FROM users WHERE email = ?',newUser.email, (err,res)=>{
                if(err) return result(err, null)
                    // console.log(res[0].count)
                if(res[0].count==0){
                    // add user
                    dbConn.query('INSERT INTO users SET ?', newUser, (err, res) => {
                        if(err) return result(err, null)
                        result(null, res.insertId)
                    })
                } else {
                    result({message:'Duplicates Email!'}, null)
                }
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

        if(user.password){
            bcrypt.genSalt(10,(err,salt)=>{
                bcrypt.hash(user.password, salt, (err, hash)=>{
                    user.password = hash
                    dbConn.query('UPDATE users SET name=?, email=?, password=? WHERE id=?', [user.name, user.email, user.password, id], (err,res)=>{
                        if(err) return result(err,null)
                        dbConn.query('SELECT * FROM users', (err,res)=>{
                            if(err) return result(err,null)
                            result(null,res)
                        })
                       
                    })
                })
            })

        } else {
            dbConn.query('UPDATE users SET name=?, email=? WHERE id=?', [user.name, user.email, id], (err,res)=>{
                if(err) return result(err,null)
                dbConn.query('SELECT * FROM users', (err,res)=>{
                    if(err) return result(err,null)
                    result(null,res)
                })
               
            })
        }

        

}

// delete product by id
User.delete = (id, result) => {
    dbConn.query('DELETE FROM users WHERE id=?', id, (err,res)=>{
        if(err) return result(err,null)
        result(null,res)
    })
}


module.exports = User