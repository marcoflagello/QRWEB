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
  res.render('cancella', { title: 'cancella luogo' });
});

module.exports = router;












