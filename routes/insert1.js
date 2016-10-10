

var express =   require("express");
var router = express.Router();
var bodyParser =    require("body-parser");
var qrImage = require('qr-image');
var fs = require('fs');





var multer  =   require('multer');
 //var upload = multer({ dest: 'uploads/' })
       var storage =   multer.diskStorage({
   
    destination: function (req, file, callback) {
    callback(null, './uploads');
     },
     filename: function (req, file, callback) {
    console.log('multer: ' + req.body.formid);
    var idname = (req.user._id + "_" + file.originalname);
    callback(null, idname);
     }
    });
    var upload = multer({ storage : storage}).array('image', 6);






var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = 'mongodb://mongodb_connection_string/userdata';
var qrURL = 'http://localhost:3000/';
console.log(qrURL)



router.post('/', function(req, res, next) {
    console.log(req.file.destination);
    console.log(req.file);
    console.log(req.body);
    console.log(req.files);
    console.log(req.query);
    
  /*  upload(req, res,function(err) {
        console.log(req.body);
        console.log(req.files);
               
        if(err) {
            return res.end("Error uploading file.");
        }
       
    var imagearray = req.files;
    imagearray.forEach(function(entry) {
        console.log(entry.destination);
        console.log(entry.filename);
        
    }); */
    
   
        
        
    console.log(req.file.destination);
    var qrname = (req.body.qr + req.body.name + ".png" )
    var pathQr = ("./qruploads/" + req.user._id + "_" + qrname)
     
    //console.log(req.body)
    //console.log(req.body.qr)
    
    //console.log(req.file)
    
    console.log(req.files['image']);
    
    
    var pathImage = (req.file.destination + "/" + req.user._id + "_" + req.file.originalname)
    console.log(pathImage);
    //req.body.qr = pathQr
    req.body.image = pathImage;
    
    var item = {
    name: req.body.name,
    descrizione: req.body.descrizione,
    image : req.body.image,
    qr : pathQr
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var userdata = ("userdata" + "_" + req.user._id);
    
    db.collection(userdata).insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      //console.log(req.body)
      //console.log(req.body.name)
      //console.log(req.body.descrizione)
      //console.log(req.body.qr)
      /*db.collection('userdata').findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item found');*/
      console.log(item)
      console.log(qrURL)
      var qrURLdef = (qrURL + "luogo?id=" + item._id);
      qrImage
    .image(qrURLdef , {type:'png', size:20})
    .pipe(fs.createWriteStream(pathQr));
      
      db.close();
      res.redirect('/luoghi');
      });
    });
 // });

 
});






















/*
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    console.log('multer: ' + req.body.formid);
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage});
   
  
   router.post('/', upload.single('image'), function (req, res, next) {
    console.log('Hellooooooooooooooooo!')
   console.log(req.files)
 
    console.log('item inserted')
   var elementID = req.body.formid;
    console.log('elementID: ' + elementID);
    
  // req.body contains the text fields
  res.render('index', { title: 'Crea luogo' });
})








*/
module.exports = router;
















/*
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = 'mongodb://localhost:27017/test';




router.post('/', function(req, res, next) {
  var item = {
    name: req.body.name,
    descrizione: req.body.descrizione,
    image: req.body.image
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('userdata').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      console.log(req.body)
      console.log(req.body.name)
      console.log(req.body.descrizione)
      db.close();
      res.redirect('/luoghi');
    });
  });

 
});

module.exports = router;
*/