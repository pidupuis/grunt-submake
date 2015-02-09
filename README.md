# grunt-submake

> Run Make rules through Grunt tasks (by just specifying the Makefile path and the rules!)

## Description

If your project integrates subprojects using GNU Make, this plugin is made for you! With this plugin you will be able to run any Make rules from any Makefile inside any Grunt task.

Numerous use cases including:
* Build your Make-based subprojects during the build of your Grunt-based parent project,
* Run your subprojects' tests during the test process of your parent project,
* Combine `grunt-contrib-watch` with the power of Make to rebuild modified subprojects' parts without manual server reloading,
* Define easily a submake task for each Make-based subproject (no need to remember which rules to run for which subproject),
* Handle easily interoperability between Make and Grunt in every case (<b>no need for subprojects specifically</b>),
* Keep using command lines without shame (custom Grunt tasks are pretty cool but they could wait),
* Do a lot of other thing only you could imagine!

#### This plugin is compatible with <b>[CMake](http://www.cmake.org/)</b>!

This plugin was inspired by [grunt-subgrunt](https://github.com/tusbar/grunt-subgrunt), which rocks the world by the way.

## Getting Started
This plugin requires Grunt `~0.4.5`
This plugin aims to run GNU Make commands for subprojects based on this tool so be sure to have [GNU Make](http://www.gnu.org/software/make/) installed.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-submake --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-submake');
```

## The "submake" task

### Overview
In your project's Gruntfile, add a section named `submake` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  submake: {
    your_target: {
      options: {
        // Target-specific options
      },
      projects: {
        // Paths to subprojects' Makefile
      }
    },
  },
});
```

### Options

#### options.cmake
Type: `bool`
Default value: `true`

Determines if you want to run `cmake` before `make` to generate the Makefile.

### Usage Examples

```js
grunt.initConfig({
  submake: {
    target1: {
      projects: {
        // For each of these projects, the specified make tasks will be executed:
        'sub-projects/module': '',
        'sub-projects/module2': 'build'
      }
    },
    target2: {
      // Use an array to run multiple tasks:
      'sub-projects/module': [ 'clean', 'test' ]
    },
    target3: {
      // you can add parameters by add an array depth
      'sub-projects/module': [ 'clean', [ 'build', '--dist="/usr/bin/"' ]]
    },
    target4: [
      // Using an array will just execute make for each one:
      'sub-projects/module',
      'sub-projects/module2'
    ],
    target5: {
      // you can run cmake before make tasks:
      options: {
        cmake: true
      },
      projects: [
        'sub-projects/module'
      ]
    }
    target6: {
      // no need for subprojects, you can handle interoperability
      // by running make at the project root (or anywhere else)
      '.': 'build'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Do not hesitate to open an [issue](https://github.com/pidupuis/grunt-submake/issues) to report a bug. Any <b>ideas of improvement</b> are also welcome as issue!

## Release History

* Coming soon: CMake arguments
* 0.1.0: Run `make` rules  (with arguments or not) for specific paths; Can also run CMake beforehand to generate the Makefile
