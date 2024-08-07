const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')


// config cors ------------
const coreOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200
}

// ເປີດໃຊ້ Cors ------
app.use(cors(coreOptions))
// ---------------


// ນຳໃຊ້ body-parser ເພື່ອດຶງຂໍ້ມູນຈາກ Form
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// const middleware = require('./src/middleware/auth.middleware')

// route.use(middleware)

app.use(require('./src/routes/routes'))

// ສ້າງ path ສະແດງຮູບພາບ
app.use('/assets/image',express.static('uploads'))

app.listen(3000, () => {
    console.log("Server Running Port:3000 on localhost")
})
