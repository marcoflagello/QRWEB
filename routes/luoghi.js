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


router.get('/', ensureAuthenticated, function(req, res, next) {
   
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('connected to mongo GET');
    var userdata = ("userdata" + "_" + req.user._id);
    var cursor = db.collection(userdata).find();
    
    cursor.forEach(function(doc, err) {
        
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
       console.log('db closed');
       console.log(resultArray);
       
      res.render('luoghi', {items: resultArray});
    });
  });
});


module.exports = router;
