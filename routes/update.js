var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = 'mongodb://localhost:27017/test';


router.post('/', function(req, res, next) {
    console.log(req.body);
  var item = {
    name: req.body.name,
    descrizione: req.body.descrizione,
    image: req.body.image
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var userdata = ("userdata" + "_" + req.user._id);
    db.collection(userdata).updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      console.log(req.body)
      console.log(req.body.name)
      console.log(req.body.descrizione)
      db.close();
      res.redirect('/luoghi');
    });
  });
});


module.exports = router;
