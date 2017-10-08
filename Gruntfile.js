'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {},
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'app/styles/app.css': 'app/styles/scss/app.scss',
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['app/index.html', 'app/*/*.html']
      },
      sass: {
        options: {
          livereload: false
        },
        files: ['app/styles/scss/*.scss'],
        tasks: ['sass'],
      },
      css: {
        files: [],
        tasks: ['-']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect',
    'sass',
    'watch'
  ]);
};