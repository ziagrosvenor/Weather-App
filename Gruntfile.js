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

    compass: {
      dev: {
        options: {
          sassDir: './sass',
          cssDir: './client/css',
          outputStyle: 'expanded',
          noLineComments: true
        }
      }
    },

    jshint: {
        target: ['./client/js/*.js', 'app.js', 'Gruntfile.js']
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
          './client/views/html/list.html': './client/views/jade/list.jade',
          './client/views/html/add.html': './client/views/jade/add.jade',
          './client/views/html/edit.html': './client/views/jade/edit.jade'
        }
      }
    },

    watch: {
      options: {
        livereload: 35729
      },

      scripts: {
        files: ['./client/js/*.js', 'app.js'],
        tasks: ['jshint'],
        options: {
          event: ['added', 'changed'],
        },
      },

      compass: {
        files: ['./sass/*.scss'],
        tasks: ['compass'],
      },

      prefixr: {
        files: ['./sass/*.scss'],
        tasks: ['autoprefixer'],
      },

      jade: {
        files: ['./client/views/jade/*.jade'],
        tasks: ['jade'],
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task(s).
  grunt.registerTask('default', ['compass', 'jshint', 'autoprefixer', 'jade']);
  grunt.registerTask('server', ['watch']);

};