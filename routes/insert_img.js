

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
    console.log(req.files);
     },
     filename: function (req, file, callback) {
    console.log('multer: ' + req.body.formid);
    console.log(req.user._id);
    var name = (req.user._id + "_" + Date.now() + "_" + file.originalname);
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
console.log(qrURL)



router.post('/', upload.array('image', 12), function(req, res, next) {
    
   
    
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" + req.user._id);
    console.log(req.body);
    
    
    var id = req.query.id;
  console.log(id);
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var userdata = ("userdata" + "_" + req.user._id);
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh' + userdata);
    console.log(id);
   
    var resultArray =new Array();
    var pathImage =new Array();
     var i = 0;
    var imagearray = req.files;
    imagearray.forEach(function(entry) {
        console.log(entry.destination);
        console.log(entry.filename);
        console.log(entry.mimetype);
        
    pathImage[i] = (entry.destination + '/' + entry.filename);
    if (entry.mimetype === "image/jpeg" || entry.mimetype === "image/jpg" || entry.mimetype === "image/png") {
    db.collection(userdata).update({ '_id' : objectId(id) },
    { $push: { "image": pathImage[i] } },
    { multi: false }
     );
    
    console.log(pathImage[i]);
    resultArray.push(pathImage[i]);
    i=i++;
    }
       else {
    db.collection(userdata).update({ '_id' : objectId(id) },
    { $push: { "video": pathImage[i] } },
    { multi: false }
     );
    
    console.log(pathImage[i]);
    resultArray.push(pathImage[i]);
    i=i++;
    
             
    }
    
});
    
  
  
    
      db.collection(userdata).findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item found');
      console.log(result);
      console.log(result.descrizione);
     
      db.close();
      res.render('modifica', {item: result});
    });
    });
  });
     

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