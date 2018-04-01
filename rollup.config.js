// rollup.config.js
const babel =  require('rollup-plugin-babel')
const uglify =  require('rollup-plugin-uglify')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

export default {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'pubber'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    uglify({
      compress: {
        collapse_vars: true
      }
    })
  ]
}