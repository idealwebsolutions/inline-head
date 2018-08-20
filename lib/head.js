'use strict'

var trumpet = require('trumpet')

var Stylesheet = require('./stylesheet')

module.exports = function (styles) {
  var tr = trumpet()

  var head = tr.createStream('head > style')
  head.pipe(Stylesheet(styles)).pipe(head)

  return tr
}
