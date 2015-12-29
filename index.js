module.exports = function (superOptions) {
  var mapBlock = require('./lib/map')(superOptions);
  var ifBlock = require('./lib/if')(superOptions);
  var whileBlock = require('./lib/while')(superOptions);

  return {
    $beginMap: mapBlock.$beginMap,
    $endMap: mapBlock.$endMap,
    $beginIf: ifBlock.$beginIf,
    $endIf: ifBlock.$endIf,
    $beginWhile: whileBlock.$beginWhile,
    $endWhile: whileBlock.$endWhile,
    // Alias
    $beginEach: mapBlock.$beginMap,
    $endEach: mapBlock.$endMap
  };
};
