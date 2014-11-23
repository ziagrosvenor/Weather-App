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

    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: {
          './client/views/html/list.html': './client/views/jade/list.jade'
        }
      }
    },

    watch: {
      options: {
        // Start another live reload server on port 1337
        livereload: 35729
      },

      scripts: {
        files: ['./client/js/app.js', 'app.js'],
        tasks: ['jshint'],
        options: {
          event: ['added', 'changed'],
        },
      },

      jade: {
        files: ['./client/views/jade/*.jade'],
        tasks: ['jade'],
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task(s).
  grunt.registerTask('default', ['jshint', 'autoprefixer', 'jade']);
  grunt.registerTask('server', ['watch']);

};