module.exports = function (superOptions) {
  var mapBlock = require('./lib/map')(superOptions);
  var ifBlock = require('./lib/if')(superOptions);

  return {
    $beginMap: mapBlock.$beginMap,
    $endMap: mapBlock.$endMap,
    $beginIf: ifBlock.$beginIf,
    $endIf: ifBlock.$endIf,
    // Alias
    $beginEach: mapBlock.$beginMap,
    $endEach: mapBlock.$endMap
  };
};
