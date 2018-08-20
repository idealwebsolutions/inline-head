'use strict'

var createHash = require('crypto').createHash
var trumpet = require('trumpet')
var PassThrough = require('readable-stream').PassThrough

var head = require('./lib/head')

module.exports = function (options) {
  var tr = trumpet()
  var chunks = []
  var styles = {}

  tr.selectAll('*[style]', function (el) {
    var style = el.getAttribute('style')
    var id = el.getAttribute('id')

    if (!id) {
      id = el.name + '_' + createHash('md5').update(style.trim()).digest('hex').slice(0, 8)
      el.setAttribute('id', id)
    }

    el.removeAttribute('style')
    styles[id] = style
  })

  tr.on('data', function (chunk) {
    chunks.push(chunk)
  })

  tr.once('end', function () {
    var stream = new PassThrough()
    stream.end(Buffer.concat(chunks))
    stream.pipe(head(styles)).pipe(process.stdout)
  })

  process.stdin.pipe(tr)
}
