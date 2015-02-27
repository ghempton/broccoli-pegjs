# broccoli-pegjs

A [PEG.js](http://pegjs.org/) filter for [Broccoli](http://broccolijs.com/).

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

* `wrapper` - Wrap the generated parser in any code you want:

```
tree = peg(tree, {
  wrapper: function (src, parser) {
    return 'var Parser = ' + parser + ";\nvar parse = Parser.parse, SyntaxError = Parser.SyntaxError;\nexport {SyntaxError, parse};\nexport default parse;";
  }
});
```

* `peg` - Provide an alternative peg instance (for example [pegjs-import](https://github.com/casetext/pegjs-import)):

```
tree = peg(tree, {
  peg: require('pegjs-import')
});
```
