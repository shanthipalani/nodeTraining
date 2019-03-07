var express = require('express');
var router = express.Router();

var qpdf = require('node-qpdf');

router.get('/pdf', function(req, res, next) {
    console.log(req);
    res.render('pdf', { title: 'Remove password from pdf' });

});

/* GET users listing. */
router.get('/decrypt/pdf', function(req, res, next) {
    console.log(req);
    //qpdf.decrypt('shan.pdf', 'FQCPS3782Q02061993');

    //res.send('PDF decrypt');

    qpdf.decrypt('/shan.pdf', 'FQCPS3782Q02061993', '/uploads');

    //doc.stdout.pipe(res);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        'Content-Disposition': 'inline; filename=order.pdf'
    });
});

module.exports = router;
