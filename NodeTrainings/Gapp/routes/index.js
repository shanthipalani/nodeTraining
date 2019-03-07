var express = require('express');
var router = express.Router();
var fs = require('fs');
var async = require('async');

var request = require("request");

var nodemailer = require('nodemailer');

var aff = require('flipkart-affiliate');

var fkc = aff.createClient({
    FkAffId: 'shanumamm', //as obtained from [Flipkart Affiliates API](https://affiliate.flipkart.com/api-docs/)
    FkAffToken: '143079b9135a4a058140af8ebcbc7172',
    responseType: 'json'
});


const check = function(arg,callback){
		if(typeof arg !== 'number'){
			return callback('Not a num');
		}
		callback (null,'number');
	}

	check(2019,function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log(data);
		}
	});


var transporter = nodemailer.createTransport({
 type: 'smtp',
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 auth: {
   user: 'keerthirajme@gmail.com',
   pass: '*****'
 }
});

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });

});

/* GET home page. */
router.get('/flipkart', function(req, res, next) {

    res.render('flipkart', { title: 'Flipkart affiliate products' });

});


/* GET API page. */
router.get('/api', function(req, res, next) {

    res.render('api', { title: 'Express' });

});

router.post('/flipkart/api',function(req, res, next){

    /*fkc.getDealsOfDay(null,function(err, resp){ //DOD
        if(!err){
            console.log(resp);
            res.send({
                flag : true,
                data : JSON.parse(resp)
            });

        }else{
            console.log(err);
            res.send({
                flag : false,
                data : err
            });
        }
    });*/

    var option = {
    	url : "https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json",
        headers : {
            'Fk-Affiliate-Id': 'shanumamm',
            'Fk-Affiliate-Token' : '143079b9135a4a058140af8ebcbc7172'
        }
	}


    request.get(option, function (error, response, body) {
        if (error) {
            console.log('Error:', error);
            res.send({
                flag : false
            });
        } else {

            console.log(body);

            var resData = JSON.parse(body);
            res.send({
                flag : true,
                data : resData
            });
        }
    });

});


router.post('/search/api',function(req, res, next){

	var flag = req.body.flag;
	var url;

	if(flag == "search"){
        url = "https://swapi.co/api/people/?search="+req.body.search;
	}else{
		url = req.body.url;
	}

	console.log(url);

    request(url, function(error, response, html) {
        if (error) {
            console.log('Error:', error);
            res.send({
                flag : false
            });
        } else {

        	console.log(html);

            var resData = JSON.parse(html);
            res.send({
                flag : true,
                data : resData
            });
        }
    });

});

router.post('/sendmail',function(req, res, next){
	//console.log(req);
	var name = req.body.name;
	var email = req.body.email;
	
	
	const mailOptions = {
	  from: 'keerthirajme@gmail.com', // sender address
	  //to: 'vinodh.chithu@gmail.com', // list of receivers
		to: 'shanumammu93@gmail.com',
	  subject: 'Email test', // Subject line
	  html: '<div><p>Name: </p>'+name+'<p>Email</p>:'+email+'<div>' // plain text body
	};

	transporter.sendMail(mailOptions, function (err, info) {
	   if(err){
		   console.log(err);
		   res.send({
			   flag:false,
			   msg: "Mail not sent"
		   });
	   }else{
	   	   console.log(info);
		   res.send({
			   flag:true,
			   msg: "Mail sent successfully"
		   });
	   }
	     
	});
				
});

router.get('/waterfall',function(req,res,next){

    async.waterfall([
        function(callback) {
            callback(null, 'one', 'two');
        },
        function(arg1, arg2, callback) {
            // arg1 now equals 'one' and arg2 now equals 'two'
            callback(null, 'three');
        },
        function(arg1, callback) {
            // arg1 now equals 'three'
            callback(null, 'done');
        }
    ], function (err, result) {
        console.log(result);
        //res.end(result);
        // result now equals 'done'
    });



// Or, with named functions:
    async.waterfall([
        myFirstFunction,
        mySecondFunction,
        myLastFunction,
    ], function (err, result) {
        console.log(result);
        res.end(result);
        //result now equals 'done'
    });
    function myFirstFunction(callback) {
        callback(null, 'one', 'two');
    }
    function mySecondFunction(arg1, arg2, callback) {
        //arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    }
    function myLastFunction(arg1, callback) {
        //arg1 now equals 'three'
        callback(null, 'donefunction');
    }

});

router.get('/series',function(req,res,next){
    async.series([
                function(callback) {
                    // do some stuff ...
                    callback(null, 'one');
                },
                function(callback) {
                    // do some more stuff ...
                    callback(null, 'two');
                }
            ],
            function(err, results) {
            console.log(results[0]);
                console.log(results[1]);
                //res.end(JSON.stringify(results));
                // results is now equal to ['one', 'two']
            });

    async.series({
        one: function(callback) {
            setTimeout(function() {
                callback(null, 1);
            }, 100);
        },
        two: function(callback){
            setTimeout(function() {
                callback(null, 2);
            }, 200);
        }
    }, function(err, results) {
        console.log(results.one);
        console.log(results.two);
        //results is now equal to: {one: 1, two: 2}
       res.end(JSON.stringify(results));
    });
});

router.get('/parallel',function(req,res,next){
    async.parallel([
                function(callback) {
                    // do some stuff ...
                    callback(null, 'one');
                },
                function(callback) {
                    // do some more stuff ...
                    callback(null, 'two');
                }
            ],
            function(err, results) {
                //res.end(JSON.stringify(results));

                // results is now equal to ['one', 'two']
            });

    async.parallel({
        one: function(callback) {
            setTimeout(function() {
                callback("error", 1);
            }, 200);
        },
        two: function(callback){
            setTimeout(function() {
                callback(null, 2);
            }, 1000);
        }
    }, function(err, results) {
        if(err){
            console.log(err);
            res.end("Error)");
        }else{
            res.end(JSON.stringify(results));
        }
        // results is now equal to: {two: 2, one: 1}

    });
});

router.get('/whilst',function(req,res,next){
    var count = 0;
    async.whilst(
            function() { return count < 5; },
            function(callback) {
                count++;
                setTimeout(function() {
                    callback(null, count);
                }, 1000);
            },
            function (err, n) {

                res.end(JSON.stringify(n));
                // 5 seconds have passed, n = 5
            }
    );
});


router.get('/queue',function(req,res,next){
    // create a queue object with concurrency 2
    var q = async.queue(function(task, callback) {
        console.log('hello ' + task.name);
        callback();
    }, 2);

// assign a callback
    q.drain = function() {
        console.log('all items have been processed');
    };

    q.push([{name: 'baz1'},{name: 'bay2'},{name: 'bax3'}], function(err) {
        console.log('finished processing item');
    });

// add some items to the queue
    q.push({name: 'foo'}, function(err) {
        console.log('finished processing foo');
    });
    // add some items to the front of the queue
    q.unshift({name: 'bar1'}, function (err) {
        console.log('finished processing bar');
    });
    q.push({name: 'bar'}, function (err) {
        console.log('finished processing bar');
    });

// add some items to the queue (batch-wise)


// add some items to the front of the queue
    q.unshift({name: 'bar'}, function (err) {
        console.log('finished processing bar');
    });
});


module.exports = router;
