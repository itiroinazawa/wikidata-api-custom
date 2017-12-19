# Wikidata-API by Inazawa Itiro

API criada para consultar informações com base nos itens disponíveis pelo site [WikiData](https://www.wikidata.org/wiki/Wikidata:Main_Page)

A ideia principal é poder consultar tanto entidades específicas, como também termos que podem ser encontrados dentro de outras buscas.

Essa API servirá como ponto de partida de pesquisa sobre assuntos aleatórios e dar um guideline sobre quais assuntos estão no entorno do termo pesquisado

## Como Utilizar

Para utilizar o serviço, basta realizar um POST na URL conforme abaixo:

\<url\>/api/search

Exemplo:
localhost:8080/api/search

Passando como valor o termo a ser pesquisado em formato JSON:

**_{ "field" : "Machine Learning" }_**

## Resultados

### Sucesso

Quando são encontradas informações, os resultados são retornados com a seguinte estrutura:

    1. results (array) 

      2.1. label (string)

      2.2. list (array)

          3. info (string)

Abaixo segue o exemplo do retorno gerado pela API:

    _{
        "result": [
            {
                "label": "machine learning Framework",
                "list": [
                    {
                        "info": "subclass of: software framework"
                    }
                ]
            },
            {
                "label": "Machine learning approaches distinguish multiple stress conditions using stress-responsive genes and identify candidate genes for broad resistance in rice.",
                "list": [
                    {
                        "info": "volume: 164"
                    },
                    {
                        "info": "instance of: scientific article"
                    },
                    {
                        "info": "issue: 1"
                    },
                    {
                        "info": "author name string: Rafi Shaik"
                    },
                    {
                        "info": "published in: Plant Physiology"
                    },
                    {
                        "info": "page(s): 481-495"
                    }
                ]
            },
            {
                "label": "Machine learning in cell biology - teaching computers to recognize phenotypes.",
                "list": [
                    {
                        "info": "instance of: scientific article"
                    },
                    {
                        "info": "volume: 126"
                    },
                    {
                        "info": "issue: Pt 24"
                    },
                    {
                        "info": "published in: Journal of Cell Science"
                    },
                    {
                        "info": "author name string: Christoph Sommer"
                    },
                    {
                        "info": "page(s): 5529-5539"
                    }
                ]
            }
          ]
      }_
  
  
### Sem Informações

Quando nenhuma informação é encontrada, a API retornará a seguinte estrutura em JSON

    _{ message : 'No results found' }_

