var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const util = require('util');

var searcher = require("./structure/wikidata.js");
var wdk = require('./structure/wikidata-full');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var router = express.Router();              // get an instance of the express Router


router.get('/', function(req, res) {	
	res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/search')
	.post(function(req, res) {
		
		var field = req.body.field;		
		
		console.log('Searching term: ' + field)		
		
		searcher.searching(field, res, function(result, err){
			
			wdk.searching(field, function(result2, err){
				wdk.reverseClaims(result2[0], function(result3, err){
					console.log('Reverse Claim')
					console.log(util.inspect(result3, true, null))
				})
			})
			
			res.json(result);

		});
	})

app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);