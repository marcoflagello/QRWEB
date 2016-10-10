var express = require('express');
var router = express.Router();




        // Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.error = 'Please sign in!';
  res.redirect('/');
}

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    
    
    
    

     var Printer = require('node-print');
var options = {
    media: 'Custom.200x600mm',
    n: 3
};
// Get available printers list 
Printer.list();
 
// Print from a buffer, file path or text 
var fileBuffer = fs.readFileSync('/path/to/file.ext');
var jobFromBuffer = printer.printBuffer(fileBuffer);
 
 
 
  
    
    
  res.render('luoghi', { title: 'cancella luogo' });
});

module.exports = router;












