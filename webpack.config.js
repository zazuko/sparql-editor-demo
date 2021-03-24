const path = require('path')
const { merge } = require('webpack-merge')
const { createDefaultConfig } = require('@open-wc/building-webpack')

module.exports = merge(
  createDefaultConfig({
    input: path.resolve(__dirname, './index.html')
  }),
  {
    resolve: {
      extensions: ['.mjs', '.js', '.json'],
      alias: {
        stream: 'readable-stream'
      }
    },
    node: {
      crypto: true
    }
  }
)
