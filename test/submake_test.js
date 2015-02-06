'use strict';

var grunt = require('grunt');
var fs = require('fs');

var read = function (src) {
  return grunt.util.normalizelf(grunt.file.read(src));
};

exports.submake = {
  simple: function (test) {
    test.expect(1);

    var actual = read('test/fixtures/simple/tmp/output.txt');
    var expected = 'success\n';
    test.equal(expected, actual, 'should create a file with "success" in it after running `make build` for a subproject');

    test.done();
  },
  multiple: function (test) {
    test.expect(2);

    var actual = read('test/fixtures/multiple/multiple-1/tmp/output.txt');
    var expected = 'success\n';
    test.equal(expected, actual, 'should create a file with "success" in it after running `make` for the first subproject');

    var actual2 = read('test/fixtures/multiple/multiple-2/tmp/output.txt');
    var expected2 = 'success\n';
    test.equal(expected2, actual2, 'should create a file with "success" in it after running `make` for the second subproject');

    test.done();
  },
  multipleTasks: function (test) {
    test.expect(2);

    var actual = read('test/fixtures/multipleTasks/tmp/output.txt');
    var expected = 'success\n';
    test.equal(expected, actual, 'should create a file with "success" in it after running `make build` for a subproject');

    var actual2 = read('test/fixtures/multipleTasks/tmp/output2.txt');
    var expected2 = 'success\n';
    test.equal(expected2, actual2, 'should create a second file with "success" in it after running `make test` for the same subproject');

    test.done();
  },
  argument: function (test) {
    test.expect(1);

    var actual = read('test/fixtures/argument/tmp/output.txt');
    var expected = 'success\n';
    test.equal(expected, actual, 'should create a file with "success" in it after running `make build OUTPUT="success"` for a subproject');

    test.done();
  },
  cmake: function (test) {
    test.expect(1);
  
    test.equal(true, fs.existsSync('test/fixtures/cmake/helloworld'), 'should generate executable after running `cmake .` and then `make` for a subproject');
  
    test.done();
  },
};
