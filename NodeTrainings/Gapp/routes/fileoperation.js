var express = require('express');
var router = express.Router();
var fs = require('fs');

/* create writeFile API */
router.get('/writeFile', function(req, res, next) {

    fs.writeFile('maha.txt', 'My dear file!', function (err) {
        if (err) {
            res.send('error');
        } else {
            console.log('message was sent to user');
            res.send('Write operation done');
        }
    });
});


/* Check for file availability
 * If file is not present, create a file and append contents
 */
router.get('/appendFile', function(req, res, next) {
    fs.appendFile('input.txt', 'New content! ', function (err) {
        if (err) throw err;
        console.log('file append successfully');
    });
    res.send("opened successfully");
});

/* create openFile API
* r+
* Open file for reading and writing. An exception occurs if the file does not exist.
* */

router.get('/openFile', function(req, res, next) {

    console.log("Going to open file!");

    fs.open('input.txt', 'r+', function(err, fd) {
        if (err) {
            console.error(err);
            res.send('error');
        }else{
            console.log(fd);
            console.log("File opened successfully!");
            res.send('File opened successfully!');

        }

    });
});

router.get('/fileInfo', function(req, res, next) {

    fs.stat('input.txt', function (err, stats) {
        if (err) {
            console.error(err);
            res.send('error');
        }else{
            console.log(stats);
            console.log("Got file info successfully!");

            // Check file type
            console.log("isFile ? " + stats.isFile());
            console.log("isDirectory ? " + stats.isDirectory());
            res.send(
                    {
                        "isDirectory " : stats.isDirectory(),
                        "isFile": stats.isFile()
                    }
            );
        }

    });
});

router.get('/deleteFile', function(req, res, next) {
    console.log("Going to delete an existing file");
    fs.unlink('input.txt', function (err) {
        if (err) {
            console.error(err);
            res.send('error');
        }else{
            console.log("File deleted successfully!");
            res.send("File deleted successfully!");
        }

    });
});


module.exports = router;
