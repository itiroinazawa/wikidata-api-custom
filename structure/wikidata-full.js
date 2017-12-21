const wdk = require('wikidata-sdk')
const util = require('util');
const breq = require('bluereq');
var WikidataSearch = require('wikidata-search').WikidataSearch;
var wikidataSearch = new WikidataSearch()


var exports = module.exports = {};

exports.searching = function(field, cb){

    const url = wdk.searchEntities(field)

    breq.get(url)
    .then(function(res){ return res.body.search})
    .then(function(items){

        IDs = []        
        items.forEach(function(result, index, array){
            IDs.push(result.id);           
        })
               
        return cb(IDs, {})
    })  
}

exports.reverseClaims = function(entity, cb){
    
    const url = wdk.getReverseClaims('P279', entity)

    breq.get(url)
    .then(function(res){
        var items = res.body.results.bindings;
        
        IDs = []

        items.forEach(function (result, index, array){
            IDs.push(result.subject.value.replace('http://www.wikidata.org/entity/', ''))
        })
    })

    wikidataSearch.getEntities(IDs, true, function(resultado, err) {

        list = []
        principal = []

        resultado.entities.forEach(function (entity, index, array){
            
            entity.claims.forEach(function (item, index, array){
                list.push({info: item.property + ': ' + item.value});
            });	

            principal.push({label: entity.label, lista: list})
        })
        
        return cb(principal, {})
    })
}

