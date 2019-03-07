var express = require('express');
var router = express.Router();

const multer = require('multer');

const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
});

/* GET home page. */
router.get('/multer', function(req, res, next) {
    res.render('multer', { title: 'Multer Example' });
});

// It's very crucial that the file name matches the name attribute in your html
router.post('/', upload.single('file-to-upload'), function(req, res) {
    res.redirect('/');
});


module.exports = router;