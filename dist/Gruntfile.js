'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      target: ['*.js', 'tests/*.js']
    },
    babel: {
      dist: {
        files: [{
          expand: true,
          src: ['*.js', 'tests/*.js'],
          dest: 'dist/'
        }]
      }
    },
    mochaTest: {
      files: ['dist/tests/*.js']
    },
    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['eslint', 'babel']
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['babel']);
  grunt.registerTask('test', ['babel', 'mochaTest']);
};