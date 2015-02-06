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

    var runMake = function(path, tasks, next) {



      tasks.forEach(function(t) {
        grunt.log.writeln('make '+t);

        grunt.util.spawn({
          cmd: 'make',
          args: t === '' ? [] : [t],
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
      });
    };

  grunt.registerMultiTask('submake', 'Grunt plugin which executes submodules make tasks.', function() {
    var cb = this.async();

    var projects = this.data.projects || this.data;
    if (projects instanceof Array) {
      var res = {};
      projects.forEach(function (el) {
        res[el] = '';
      });
      projects = res;
    }

    async.eachLimit(Object.keys(projects), Math.max(require('os').cpus().length, 2), function (path, next) {
      grunt.log.writeln(path);

      var tasks = projects[path];
      if (!(tasks instanceof Array)) {
        tasks = [tasks];
      }
      grunt.log.writeln(tasks);


      runMake(path, tasks, next);
    }, cb);
  });

};
