'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: 'app',
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'app/css/app.css': 'app/css/scss/*.scss',
        }
      }
    },
    watch: {
      files: ['app/index.html', 'app/js/*.js', 'app/css/scss/*.scss'],
      options: {
        livereload: true
      },
      html: {
        files: ['app/*/*.html']
      },
      sass: {
        options: {
          livereload: true
        },
        files: ['app/css/scss/*.scss'],
        tasks: ['sass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'connect',
    'sass',
    'watch'
  ]);
};