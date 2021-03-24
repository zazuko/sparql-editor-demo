const path = require('path')
const { merge } = require('webpack-merge')
const { createDefaultConfig } = require('@open-wc/building-webpack')
const Visualizer = require('webpack-visualizer-plugin')

module.exports = merge(
  createDefaultConfig({
    input: path.resolve(__dirname, './index.html')
  }),
  {
    plugins: [new Visualizer()],
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
