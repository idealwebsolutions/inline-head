'use strict'

var css = require('css')
var xtend = require('xtend')
var inherits = require('inherits')
var Transform = require('readable-stream').Transform

function Stylesheet (computed) {
  if (!(this instanceof Stylesheet)) {
    return new Stylesheet(computed)
  }

  Transform.call(this)

  this.computed = computed
}

inherits(Stylesheet, Transform)

Stylesheet.prototype._transform = function (chunk, enc, callback) {
  var styled = css.parse(chunk.toString().trim())
  var computed = css.parse(Object.keys(this.computed).map(function (id) {
    return css.stringify(css.parse('#' + id + ' { ' + this.computed[id] + ' }')) + '\n'
  }.bind(this)).join('\n'))

  styled.stylesheet = xtend(styled.stylesheet, {
    rules: styled.stylesheet.rules.concat(computed.stylesheet.rules)
  })

  this.push(css.stringify(styled))
  this.push('\n')

  callback()
}

module.exports = Stylesheet
