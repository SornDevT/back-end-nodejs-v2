const express = require('express')
const app = express()

// ການຮັບຂໍ້ມູນແບບ get ທີ່ແນວໂຕແປມານຳ ມີຢູ່ 2 ແບບຄື: param ແລະ query string

// get param --------------------

app.get('/say/:name', (req, res)=>{
    // let n = req.params.name
    res.send(`Say:${req.params.name}`)
})

/// get query string

app.get('/search',(req,res)=>{
    let mac = req.query.name 
    let v = req.query.version
    res.send(`MacBook:${mac} V:${v} Ram:${req.query.ram}`)
})



app.listen(3000, () => {
    console.log("Server Running Port:3000 on localhost")
})

// get, post, put, delete