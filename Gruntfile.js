module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      options: {
        browsers: ['last 10 versions']
      },
      no_dest: {
        src: './client/css/global.css' // globbing is also possible here
      },
    },

    jshint: {
        target: ['./client/js/app.js', 'app.js', 'Gruntfile.js']
    },

    watch: {
      options: {
        // Start another live reload server on port 1337
        livereload: 3000
      },

      scripts: {
        files: ['./client/js/app.js', 'app.js'],
        tasks: ['jshint'],
        options: {
          event: ['added', 'changed'],
        },
      }

      // prefixer: {
      //   files: 'sass/*scss',
      //   tasks: ['autoprefixer'],
      // }
    },

    express: {
      all: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: ['./client/'],
          livereload: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  


  // Default task(s).
  grunt.registerTask('default', ['jshint', 'autoprefixer']);
  grunt.registerTask('server', ['express', 'watch']);

};