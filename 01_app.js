const express = require('express')
const app = express()

app.get('/',  (req, res) => {
  res.send('Hello World 123456 gjdfsjgfdjsfdj')
})

app.get('/app', (req,res)=>{
    res.send("test my app")
})

app.listen(3000, () => {
    console.log("Server Running Port:3000 on localhost")
})

// get, post, put, delete