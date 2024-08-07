
const mysql = require('mysql')

// ປະກາດ host ສຳລັບເຊື່ອມຕໍ່ຖານຂໍ້ມູນ
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'nodejs_app'
})

// ທຳການເຊື່ອມຕໍ່
db.connect((error) => {
    if(error) 
    return console.log(error)
    // else
    console.log('Connect Database Success!')

   
    
})

module.exports = db

