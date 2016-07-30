var express = require('express');
var app = express();
app.use(express.static('public'));
var AWS = require('aws-sdk');
var s3 = require('s3');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
var fs = require('fs');
var env = require('./serverVars.json');

var client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3, 
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640, 
  s3Options: {
    accessKeyId: env.AWS_S3_Access_Key,
    secretAccessKey: env.AWS_S3_Secret_Key,
  },
});

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html");
})

app.post('/sendScholarshipForm', function(req, res) {
	console.log(req.body.message);
	var filePath = "public/applications/";
	var fullPath = filePath + req.body.filename;
	fs.writeFile(fullPath, req.body.message, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	    var params = {
		  localFile: fullPath,
		 
		  s3Params: {
		    Bucket: "craig-belcher-scholarship",
		    Key: req.body.filename,
		  },
		};

		var uploader = client.uploadFile(params);
			uploader.on('error', function(err) {
			  console.error("unable to upload:", err.stack);
			});
			uploader.on('progress', function() {
			  console.log("progress", uploader.progressMd5Amount,
			            uploader.progressAmount, uploader.progressTotal);
			});
			uploader.on('end', function() {
			  console.log("done uploading");
			});
		}); 
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})