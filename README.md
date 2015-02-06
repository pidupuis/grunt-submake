# grunt-submake

> Grunt plugin which executes submodule's Make tasks.
> This plugin was inspired by [grunt-subgrunt](https://github.com/tusbar/grunt-subgrunt)

## Getting Started
This plugin requires Grunt `~0.4.5`
This plugin aims to run Make commands for subprojects based on this tool so be sure to have [GNU Make](http://www.gnu.org/software/make/) installed.

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
    your_target: [
      // Projects path
    ],
  },
});
```

### Options

No options available for now.

### Usage Examples

#### Simple
In this example, `make` is executed for a specific subproject.`

```js
grunt.initConfig({
  submake: {
    simple: {
      projects: [
        'test/fixtures/simple'
      ]
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Do not hesitate to open an [issue](https://github.com/pidupuis/grunt-submake/issues) to report a bug. Any ideas of improvement are also welcome as issue.

## Release History
0.1.0 : can run `make` for subprojects (no options available)
