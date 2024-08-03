const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// ນຳໃຊ້ body-parser ເພື່ອດຶງຂໍ້ມູນຈາກ Form
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// const middleware = require('./src/middleware/auth.middleware')

// route.use(middleware)

app.use(require('./src/routes/routes'))


app.listen(3000, () => {
    console.log("Server Running Port:3000 on localhost")
})
