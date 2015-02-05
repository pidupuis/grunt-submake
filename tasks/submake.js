/*
 * grunt-submake
 * https://github.com/pidupuis/grunt-submake
 *
 * Copyright (c) 2015 pidupuis
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');

module.exports = function(grunt) {

    var runMake = function(path, next) {
      grunt.util.spawn({
        cmd: 'make',
        args: [],
        opts: {
          cwd: path,
          stdio: 'inherit'
        }
      }, function(err, result, code) {
        if (err || code > 0) {
          grunt.fail.warn(err);
        } else {
          grunt.log.ok(result);
        }
      });
      next();
    };

  grunt.registerMultiTask('submake', 'Grunt plugin which executes submodules make tasks.', function() {
    var cb = this.async();

    var projects = this.data.projects || this.data;
    if (projects instanceof Array) {
      var res = {};
      projects.forEach(function (el) {
        res[el] = 'default';
      });
      projects = res;
    }

    async.eachLimit(Object.keys(projects), Math.max(require('os').cpus().length, 2), function (path, next) {
      grunt.log.writeln(path);
      runMake(path, next);
    }, cb);
  });

};
