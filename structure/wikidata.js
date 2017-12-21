var WikidataSearch = require('wikidata-search').WikidataSearch;
var wikidataSearch = new WikidataSearch()
var util = require('util');

var wdk = require('wikidata-sdk');

var exports = module.exports = {};

exports.searching = function(field, res, cb){
	
	wikidataSearch.set('search', field);
	
	wikidataSearch.search(function(result, err) {

		//Check for errors.
		if (err) {
			console.log('Uh oh, we got an error! : ' + err);
			return;
		}

		//console.log(util.inspect(result, true, null));

		var list = []
		
		console.log(util.inspect(result, true, null));		
		
		if(result.results.length > 0)
		{
			ListarEntidades(result.results, function(result, err3){			
				return cb({result}, '');
			});		 
		}
		else{
			return cb({message : 'No results found'}, '');
		}
	});		 		
};

function ListarEntidades(entities, cb){
	
	var lista = [];
	var processou = 0;
	
	entities.forEach(function(result, index, array){
			
		var entityId = result.id;		

		wikidataSearch.getEntities([entityId], true, function(result, err) {

			if (err) {
				console.log('Uh oh, we got an error! : ' + err);
				return;
			}
			
			//console.log(util.inspect(result, true, null))
			
			listarItems(result.entities[0], function(result, err2){
				lista.push(result);			
				processou++;
			})				
			
			if(processou == array.length){				
				return cb(lista, '');
			}
		});						
	});
	
	
}

function listarItems(entity, cb){
	
	var list = [];

	if(entity != undefined){		
		
		entity.claims.forEach(function (item, index, array){
			list.push({info: item.property + ': ' + item.value});
		});		
		
		return cb({'label' : entity.label, 'list' : list}, '');
	}
	else{
		return cb({}, '');
	}
}