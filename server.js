var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var WikidataSearch = require('wikidata-search').WikidataSearch;
var wikidataSearch = new WikidataSearch()
var util = require('util');

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
		searching(field, res, function(result, err){
			
			res.json(result);
		});		
	})

function searching (field, res, cb){
	
	wikidataSearch.set('search', field);
	
	wikidataSearch.search(function(result, err) {

		//Check for errors.
		if (err) {
			console.log('Uh oh, we got an error! : ' + err);
			return;
		}

		console.log(util.inspect(result, true, null));

		var list = []
		
		ListarEntidades(result.results, function(resultadoo, err3){			
			return cb({resultadoo}, '');
		});		 
	});		 		
};

function ListarEntidades(entities, cb){
	
	var lista = [];
	var processou = 0;
	
	entities.forEach(function(resulting, index, array){
			
		var entityId = resulting.id;
		
		
		wikidataSearch.getEntities([entityId], true, function(result, err) {

			if (err) {
				console.log('Uh oh, we got an error! : ' + err);
				return;
			}
			
			console.log(util.inspect(result, true, null));				
			
			listarItems(result.entities[0], function(resultado, err2){
				lista.push(resultado);			
				processou++;
			})				
			
			if(processou == array.length){				
				return cb(lista, '');
			}
		});						
	});
	
	
}

function listarItems(entity, cb){
	
	var list = []
	entity.claims.forEach(function (item, index, array){
		list.push({info: item.property + ': ' + item.value});
	});		

	return cb({'label' : entity.label, 'list' : list}, '');
}

app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);