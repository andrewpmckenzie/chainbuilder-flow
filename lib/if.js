module.exports = function () {
  var $beginIf = function (check, done) {
    done(null, {
      check: check,
      value: this.previousResult()
    });
  };

  var $endIf = function (subchain, done) {
    var fromBegin = this.previousResult();
    var check = fromBegin.check;
    var value = fromBegin.value;

    if (check(value)) {
      subchain.run(value, done);
    } else {
      done(null, value);
    }
  };

  $beginIf.$beginSubchain = 'if';
  $endIf.$endSubchain = 'if';

  return {
    $beginIf: $beginIf,
    $endIf: $endIf
  };
};
