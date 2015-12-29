var assert = require('chai').assert;
var chainBuilder = require('chainbuilder');

describe('chainbuilder-flow', function () {
  var myChain;
  beforeEach(function () {

    var delay = 40;
    var addWithDelay = function (value, done) {
      var result = this.previousResult() + value;
      setTimeout(done.bind(null, null, result), delay);
      delay = (delay / 2) | 0;
    };

    myChain = chainBuilder({
      methods: { add: addWithDelay },
      mixins: [
        require('..')()
      ]
    });
  });

  describe('#$beginMap(), #$endMap()', function () {
    it('maps over an array in parallel', function (done) {
      var fetchedOrder = [];
      myChain([1, 2, 3])
        .$beginMap()
          .add(1)
          .add(2)
          .tap(function (err, result) {
            if (err) return;
            fetchedOrder.push(result);
          })
        .$endMap()
        .tap(function (err, result) {
          if (err) return;
          assert.deepEqual(result, [4, 5, 6]);
          assert.deepEqual(fetchedOrder, [6, 5, 4])
        })
        .end(done)
    });

    it('maps over an array in series', function (done) {
      var fetchedOrder = [];
      myChain([1, 2, 3])
        .$beginMap({ series: true })
          .add(1)
          .tap(function (err, result) {
            if (err) return;
            fetchedOrder.push(result);
          })
        .$endMap()
        .tap(function (err, result) {
          if (err) return;
          assert.deepEqual(result, [2, 3, 4]);
          assert.deepEqual(fetchedOrder, [2, 3, 4])
        })
        .end(done)
    });

    it('maps over an array with a limit', function (done) {
      var fetchedOrder = [];
      myChain([1, 2, 3])
        .$beginMap({ limit: 2 })
          .add(1)
          .tap(function (err, result) {
            if (err) return;
            fetchedOrder.push(result);
          })
        .$endMap()
        .tap(function (err, result) {
          if (err) return;
          assert.deepEqual(result, [2, 3, 4]);
          assert.deepEqual(fetchedOrder, [3, 4, 2])
        })
        .end(done)
    });
  });
});
