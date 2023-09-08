const express = require('express');
const multer =  require('multer');

const fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument;

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'images/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

const upload  = multer({storage: storage});

const router = express.Router();

router.route('/user').post(upload.single('file'), async (req,res)=>{

    const {name , age, email} = req.body;
    const fname = name.split(" ")[0];
    const fileName = req.file.filename;

    try {
        doc.pipe(fs.createWriteStream(`${email}.pdf`));
        doc.fontSize(27).text(`Details about ${fname} `, 200, 100);
        doc.fontSize(20).text(`Name : ${name}`, 100, 200);
        doc.fontSize(20).text(`age : ${age}`, 100, 300);
        doc.fontSize(20).text(`email : ${email}`, 100, 400);
        doc.image(`images/${fileName}`, {
            fit: [300, 300],
            align: 'center',
            valign: 'center'
          });
        doc.end();
        res.status(200).json(fileName);
    } catch (error) {
        res.status(400).json(error);
    }
    
});

module.exports = router;