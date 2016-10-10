var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');



var url = 'mongodb://localhost:27017/test';

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/');
}

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
     console.log(req.query.id);
    var id = req.query.id;
  
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('connected to mongo GET');
    var userdata = ("userdata" + "_" + req.user._id);
    db.collection(userdata).findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item found');
      console.log(result);
      db.close();
      res.render('modifica', {item: result});
    });
    
  });
  
  
});

module.exports = router;
