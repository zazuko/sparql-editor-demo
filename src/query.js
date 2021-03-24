export default `PREFIX wdt: <http://www.wikidata.org/prop/direct/> 
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdno: <http://www.wikidata.org/prop/novalue/>
PREFIX wikibase: <http://wikiba.se/ontology#>
PREFIX bd: <http://www.bigdata.com/rdf#>

#Humans without children
#Demonstrates "no value" handling
SELECT ?human ?humanLabel
WHERE
{
  ?human wdt:P31 wd:Q5 .       #find humans
  ?human rdf:type wdno:P40 .   #with at least one truthy P40 (child) statement defined to be "no value"
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
}`
