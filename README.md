# broccoli-pegjs

A PEG.js filter for Broccoli.

## Installation

```bash
npm install --save-dev broccoli-pegjs
```

## Usage

```js
var peg = require('broccoli-pegjs');
tree = peg(tree, options);
```

## Options

### Custom Wrapper

It is possible to wrap the generated parser in any code you want:

```
tree = peg(tree, {
  wrapper: function (src, parser) {
    return 'var Parser = ' + parser + ";\nvar parse = Parser.parse, SyntaxError = Parser.SyntaxError;\nexport {SyntaxError, parse};\nexport default parse;";
  }
});
```
