const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/bakery', require('./bakery'));
router.use('/employees', require('./employees'));
router.use('/deli', require('./deli'));
router.use('/produce', require('./produce'));
router.use('/seasonal', require('./seasonal'));

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});
/* function userReportHandler(req, res) {
    res.render('userreport', { title: 'Users Report' });
}

router.get('/users/report', userReportHandler); */

module.exports = router;