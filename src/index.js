import { html, render } from 'lit-html/lit-html.js'
import { asyncAppend } from 'lit-html/directives/async-append.js'
import '@rdfjs-elements/sparql-editor/sparql-editor.js'
import { turtle } from '@tpluscode/rdf-string'
import { termToNTriples } from '@rdf-esm/to-ntriples'
import query from './query.js'

const editor = document.getElementById('editor')
const results = document.getElementById('results')

function renderRow (result) {
  const row = Object.values(result).map((term) => html`<td>${termToNTriples(term)}</td>`)

  return html`<tr>${row}</tr>`
}

// for SELECT queries, StreamClient returns a stream of row objects
function renderTable (selectResults) {
  render(html`<table>
        <tbody>
            ${asyncAppend(selectResults, renderRow)}
        </tbody>
    </table>`, results)
}

// for DESCRIBE and CONSTRUCT queries, StreamClient returns an RDF/JS quad stream
async function renderGraph (stream) {
  const $rdf = (await import('rdf-ext')).default

  const dataset = await $rdf.dataset().import(stream)

  render(html`<pre>${turtle`${dataset}</pre>`}`, results)
}

async function getResults ({ detail: { query, value } }) {
  render('Running query', results)

  const SparqlClient = (await import('sparql-http-client')).default
  const client = new SparqlClient({
    endpointUrl: 'https://query.wikidata.org/sparql'
  })

  // Based on the query kind, run the appropriate client method
  switch (query.queryType) {
    case 'DESCRIBE':
    case 'CONSTRUCT':
      client.query.construct(value).then(renderGraph)
      break
    case 'SELECT':
      client.query.select(value).then(renderTable)
      break
    case 'ASK':
      // for ASK queries, StreamClient returns a boolean
      client.query.ask(value).then(result => render(html`Server answered: <b>${result}</b>`, results))
      break
    default:
      render(html`Unsupported query form <code>${query.queryType}</code>`, results)
  }
}

render(html`<sparql-editor .value=${query} @parsed=${getResults}></sparql-editor>`, editor)