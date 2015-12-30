var chainBuilder = require('chainbuilder');

var myChain = chainBuilder({
  methods: {
    plus: function(num, done) { done(null, this.previousResult() + num); },
    times: function(num, done) { done(null, this.previousResult() * num); },
    sum: function (done) {
      var sum = 0;
      this.previousResult().forEach(function (i) { sum += i; });
      done(null, sum);
    }
  },
  mixins: [
    require('.')()
  ]
});

myChain(3)
  .plus(-1)
  .$beginWhile(function (result) { return result < 20 })
    .plus(1)
    .times(2)
    .$beginIf(function (result) { return result < 10 })
      .plus(1)
      .transformResult(function (r) { return [r, r+1]; })
      .$beginMap()
        .plus(1)
      .$endMap()
      .sum()
    .$endIf()
  .$endWhile()
  .plus(1)
  .end(function (err, result) { console.log(err, result); /* > 40 */ });
