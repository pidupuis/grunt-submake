# grunt-submake

> Grunt plugin which executes subprojects' Make tasks.

## Description

If your project integrates subprojects using GNU Make, this plugin is made for you. With this plugin you will be able to run make targets inside your grunt process.

For instances:
* you can build your subproject(s) during the build of your entire project,
* you can also run `make test` as a step of your `grunt test` task,
* you can integrate a `make build` into your grunt-contrib-watch looking at your subproject,
* you can run make targets independently for all of your subprojects,
* and off course, you can also run make targets for your entire project

This plugin is compatible with Cmake!

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

Determines if you want to run `cmake` before `make`.

### Usage Examples

#### Simple
In this example, `make` is executed for a specific subproject.`

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
      // no need for subprojects, you can handle interoperability by running make at the project root
      '.': 'build'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Do not hesitate to open an [issue](https://github.com/pidupuis/grunt-submake/issues) to report a bug. Any ideas of improvement are also welcome as issue.

## Release History
0.1.0 : Run `make` targets for specific paths (can also run CMake)
