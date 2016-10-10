var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = 'mongodb://mongodb_connection_string/userdata';


// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/');
}


router.get('/', function(req, res, next) {

console.log(req.query);
 console.log(req.query.foto); 
   console.log(req.user._id);
 console.log(req.query.id);
    var id = req.query.id;
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var userdata = ("userdata" + "_" + req.user._id);
    if (req.query.type === "\'video\'") {
         db.collection(userdata).update({ '_id' : objectId(id) },
    { $pull: { "video": { $in: [ req.query.foto ] }} },
    { multi: false }
     );
    }
    else{
        db.collection(userdata).update({ '_id' : objectId(id) },
    { $pull: { "image": { $in: [ req.query.foto ] }} },
    { multi: false }
     );
    }
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
 * 
var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');


var url = 'mongodb://localhost:27017/test';


router.get('/', function(req, res, next) {


    var id = req.query.id;
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var userdata = ("userdata" + "_" + req.user._id);
   // var test = db.collection(userdata).find({"_id": objectId(id)});
   console.log("req.query.foto:");
    console.log(req.query.foto); 
   console.log(objectId(id));
   
   db.collection(userdata).deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log(result);
      
    });
   
   db.collection(userdata).findOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item found');
      console.log(result);
   
      db.collection(userdata).update(
    { '_id' : objectId(id) },
    { $pull: { image: { $in: [ req.query.foto ] }} },
    { multi: false }
    );

    
   
   // db.collection(userdata).find({"_id": objectId(id)}, function(err, result) {
        
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
      res.redirect('/luoghi');
    });
  });
});

module.exports = router;


*/

