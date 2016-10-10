var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = 'mongodb://localhost:27017/test';


router.get('/', function(req, res, next) {



 console.log(req.query.id);
    var id = req.query.id;
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var userdata = ("userdata" + "_" + req.user._id);
    db.collection(userdata).deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
      res.redirect('/luoghi');
    });
  });
});

module.exports = router;
