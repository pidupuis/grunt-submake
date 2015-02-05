'use strict';

var grunt = require('grunt');

exports.submake = {
  simple: function (test) {
    test.expect(1);
    var fs = require('fs');
    test.equal(true, fs.existsSync('test/fixtures/simple/hellomake'), 'should generate an executable');
    test.done();
  },
};
