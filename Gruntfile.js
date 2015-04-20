module.exports = function(grunt) {
  grunt.initConfig({
    eslint: {
      target: ['lib/*.js', 'tests/*.js']
    },
    babel: {
      dist: {
        files: [{
          expand: true,
          src: ['tests/*.js'],
          dest: 'dist/'
        }, {
          expand: true,
          src: ['lib/*.js'],
          flatten: true,
          dest: 'dist/'
        }]
      }
    },
    mochaTest: {
      files: ['dist/tests/*.js']
    },
    watch: {
      scripts: {
        files: 'lib/*.js',
        tasks: ['babel']
      }
    }
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', [ 'babel']);
  grunt.registerTask('test', ['babel', 'mochaTest']);
};
