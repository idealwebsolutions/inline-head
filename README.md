# inline-head

Tool to move inlined styles to the head of the document

## Why
Inlined styles are usually always a pain to maintain. This module attempts to make life easier by moving them all into one compact and readable stylesheet. 

Ideally, you'd want to pair this up with another module that extracts the inlined stylesheet to a external style sheet.

## Usage
    
    $ git clone https://github.com/idealwebsolutions/inline-head
    $ cd inline-head && npm -g install
    $ inline-head < examples/index.html > new-index.html

## Features
- Assigns id selectors using a prefix and content hash when no id is found

## TODO
- Tests

## License
MIT
