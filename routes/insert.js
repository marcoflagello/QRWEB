

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
    //console.log(req.files);
     },
    filename: function (req, file, callback) {
    //console.log('multer: ' + req.body.formid);
    //console.log(req.user._id);
    var name = (req.user._id + "_" + Date.now() + "_" + file.originalname);
    //console.log(file.mimetype);
    var mime = file.mimetype
            
    callback(null, name, mime);
     }
    });
var upload = multer({ storage : storage});





var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = 'mongodb://mongodb_connection_string/userdata';
var qrURL = 'http://localhost:3000/';
//console.log(qrURL)



router.post('/', upload.array('image', 12), function(req, res, next) {
    
   /* console.log(req.files);
     console.log(req.body);
     var imagePath =new Array();
     var i = 0;
    var imagearray = req.files;
    imagearray.forEach(function(entry) {
        console.log(entry.destination);
        console.log(entry.filename);
        
    imagePath[i] = (entry.destination + '/' + entry.filename);
    console.log(imagePath[i]);
    
    i=i++;
    
    });  
    console.log(entry);
    console.log(imagePath[0]);
    console.log(imagePath[1]);
    */
    
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + req.user._id);
    //console.log(req.body);
    var qrname = (req.body.qr + req.body.name + ".png" )
    var pathQr = ("./qruploads/" + req.user._id + "_" + Date.now() + "_" + qrname )
    //console.log(pathQr); 
    
    //console.log(req.body)
    //console.log(req.body.qr)
    
    //console.log(req.file)
    //console.log(req.file.originalname)
    //console.log(req.file.destination)
   
    //var pathImage = (req.file.destination + "/" + req.file.originalname)
    var resultArray_image =new Array();
    var resultArray_video =new Array();
    var pathImage =new Array();
     var i = 0;
    var imagearray = req.files;
    console.log(imagearray);
    imagearray.forEach(function(entry) {
        console.log(entry.destination);
        console.log(entry.mimetype);
        console.log(entry.filename);
        
    pathImage[i] = (entry.destination + '/' + entry.filename);
    //console.log(pathImage[i]);
    if (entry.mimetype === "image/jpeg" || entry.mimetype === "image/jpg" || entry.mimetype === "image/png") {
         resultArray_image.push(pathImage[i]);
         i=i++;
     }  
     else{
         resultArray_video.push(pathImage[i]);
       i=i++;
   }
    });  
    //console.log(resultArray);
    //req.body.qr = pathQr
    //req.body.image = resultArray_image;
    
       
    
    var item = {
    name: req.body.name,
    descrizione: req.body.descrizione,
    image : resultArray_image,
    video : resultArray_video,
    qr : pathQr
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var userdata = ("userdata" + "_" + req.user._id);
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh' + userdata);
    db.collection(userdata).insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      console.log(req.body);
      //console.log(req.body.name)
      //console.log(req.body.descrizione)
      //console.log(req.body.qr)
      /*db.collection('userdata').findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item found');*/
      console.log(item)
      console.log(qrURL)
      var qrURLdef = (qrURL + "luogo_r?id=" + item._id);
      qrImage
    .image(qrURLdef , {type:'png', size:20})
    .pipe(fs.createWriteStream(pathQr));
      
      db.close();
      res.redirect('/luoghi');
    });
  });
     
 
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