/*
 * grunt-submake
 * https://github.com/pidupuis/grunt-submake
 *
 * Copyright (c) 2015 pidupuis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/fixtures/simple/tmp',
              'test/fixtures/multiple/multiple-1/tmp',
              'test/fixtures/multiple/multiple-2/tmp',
              'test/fixtures/multipleTasks/tmp',
              'test/fixtures/argument/tmp',
              'test/fixtures/cmake/CMakeCache.txt',
              'test/fixtures/cmake/CMakeFiles',
              'test/fixtures/cmake/cmake_install.cmake',
              'test/fixtures/cmake/Makefile',
              'test/fixtures/cmake/helloworld']
    },

    // Configuration to be run (and then tested).
    submake: {
      simple: {
        projects: {
          'test/fixtures/simple': 'build'
        }
      },
      multiple: {
        projects: [
          'test/fixtures/multiple/multiple-1',
          'test/fixtures/multiple/multiple-2'
        ]
      },
      multipleTasks: {
        projects: {
          'test/fixtures/multipleTasks': ['build', 'test']
        }
      },
      argument: {
        projects: {
            'test/fixtures/argument': [['build', 'OUTPUT="success"']]
        }
      },
      cmake: {
        options: {
          cmake: true
        },
        projects: [
          'test/fixtures/cmake'
        ]
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'submake', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
