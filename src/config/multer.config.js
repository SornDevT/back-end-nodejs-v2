const multer = require('multer')
const fs = require('fs')

exports.keyUpload = 'image' // key ໃຊ້ເພື່ອອັບໂຫຼດຮູບພາບ image ກໍ່ຈະແມ່ນຊື່ຂອງ input ທີ່ສົ່ງມາ

exports.config = {
    storage: multer.diskStorage({
       destination: (req, file, next) =>{
        
        const dir = './uploads'
            if(!fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }
            next(null,dir)
       },
       filename: (req, file, next) =>{
            const ext = file.mimetype.split('/')[1]
            next(null,`${file.fieldname}-${Date.now()}.${ext}`)
       }
    }),
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, next) => {
        // console.log(file)
        const allowed = ['image/png','image/jpg', 'image/jpeg']
        if(allowed.includes(file.mimetype)){
            next(null,true)
        } else {
            next({message: 'File Type not supported'}, false)
        }
    }
}