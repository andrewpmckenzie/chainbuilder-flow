# chainbuilder-flow [![Build Status](https://travis-ci.org/andrewpmckenzie/chainbuilder-flow.svg)](https://travis-ci.org/andrewpmckenzie/chainbuilder-flow)

Flow block (each, map, if) mixins for [chainbuilder](https://www.npmjs.com/package/chainbuilder). 

**Installation** `npm install chainbuilder chainbuilder-flow --save`

**Usage**  
```javascript
var chainBuilder = require('chainbuilder');

var myChain = chainBuilder({
  methods: {/* ... your methods ... */},
  mixins: [
    /* ... other mixins ... */
    require('chainbuilder-flow')()
  ]
});
```

## Methods

#### #$beginMap(options), #$endMap()
Begin and end a map block. The map will be made in parallel by default.  

_e.g._  
```javascript
myChain([1, 2, 3])
  .$beginMap({ series: true })
    .add(1)
    .times(2)
  .$endMap()
  .end(function (err, result) {
    console.log(result); // > [4, 6, 8]
  });
```

**`@param {Object} options`** (optional) flow control options.
**`@param {Boolean} options.series`** (optional) run the block in series (one at a time).
**`@param {Number} options.limit`** (optional) limit to running n items in parallel at a time.
**`@alias #$beginEach(options), #$endEach()`**

#### #$beginIf(checkFn), #$endIf()
Begin and end a map block. The map will be made in parallel by default.  

_e.g._  
```javascript
myChain(2)

  .$beginIf(function (result) { return result === 1; })
    .inject(3)
  .$endIf()
  .end(function (err, result) { console.log(result); // > 2 })
  
  .$beginIf(function (result) { return result === 2; })
    .inject(3)
  .$endIf()
  .end(function (err, result) { console.log(result); // > 3 });
```

**`@param {function(result):boolean} checkFn`** should the block be run?
