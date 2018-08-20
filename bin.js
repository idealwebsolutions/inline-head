#!/usr/bin/env node

'use strict'

require('./index')(require('minimist')(process.argv.slice(2)))
