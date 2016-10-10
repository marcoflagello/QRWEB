var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var ejs = require('ejs');


var url = 'mongodb://localhost:27017/test';

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/');
}

  
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
      console.log(result.descrizione);
      
      //string s = result.descrizione
      //var htmlObject = $(s); // jquery call
      //result.descrizione = JSON.stringify(result.descrizione);
      //JSONObject json = (JSONObject)new JSONParser().parse(result.descrizione);
      console.log(result.descrizione);
      // var resu = JSON.stringify(result , null, 4);
      //  console.log(resu);
      db.close();
      /*
      var resultArray = [];
      console.log(result.image);
      var getImage = result.image;
    getImage.forEach(function(entry) {
        console.log(entry);
        resultArray.push(entry);
    });
      console.log(resultArray); */
        
        
      res.render('luogo_r', {item: result});
    });
    
  });
});


module.exports = router;
