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

  var runCMake = function(path, args, next) {
    grunt.util.spawn({
      cmd: 'cmake',
      args: args,
      opts: {
        cwd: path
      }
    }, function() {
      next();
    });
  };

  var runMake = function(path, tasks, next) {
    tasks.forEach(function(t) {

      var args = [t]; // The only argument is usually the task itself (for instance `make build`)
      if (t instanceof Array) { // Array as task means arguments (for instance `make build OUTPUT="result"`)
        args = t;
      }
      else if (t === '') { // If the task is an empty string, this means no specific tasks (for instance `make`)
        args = [];
      }

      grunt.util.spawn({
        cmd: 'make',
        args: args,
        opts: {
          cwd: path
        }
      }, function(err, result, code) {
        if (err || code > 0) {
          grunt.fail.warn(err);
        }
        else {
          grunt.log.ok(result);
        }
        next();
      });

    });
  };

  grunt.registerMultiTask('submake', 'Grunt plugin which executes submodules make tasks.', function() {
    var cb = this.async();

    var cmake = false;
    if (this.data.options) {
      if (this.data.options.cmake) {
        cmake = true;
        var cmakeArgs = this.data.options.cmake;
        if (!(cmakeArgs instanceof Array)) {
          cmakeArgs = [cmakeArgs];
        }
      }
    }

    var projects = this.data.projects || this.data;
    if (projects instanceof Array) {
      var res = {};
      projects.forEach(function(el) {
        res[el] = '';
      });
      projects = res;
    }

    var actions = [];
    Object.keys(projects).forEach(function(path) {
      actions.push(function(callback) {

        var tasks = projects[path];
        if (!(tasks instanceof Array)) {
          tasks = [tasks];
        }

        if (cmake) {
          runCMake(path, cmakeArgs, function() {
            runMake(path, tasks, function() {
              callback();
            });
          });
        }
        else {
          runMake(path, tasks, function() {
            callback();
          });
        }
      });
    });

    actions.push(cb);
    async.series(actions);
  });

};
