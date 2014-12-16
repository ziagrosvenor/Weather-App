module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      options: {
        browsers: ['last 10 versions']
      },
      no_dest: {
        src: './client/assets/css/global.css'
      },
    },

    compass: {
      dev: {
        options: {
          sassDir: './sass',
          cssDir: './client/assets/css',
          outputStyle: 'expanded',
          noLineComments: true
        }
      }
    },

    jshint: {
        target: ['./client/*.js', 
                './client/app/*.js',
                './client/app/**/**.js',
                './components/*/*.js',
                'server.js',
                'app.js', 
                'Gruntfile.js']
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
          './client/app/weather-map/locations/nearest-location.html': './client/app/weather-map/locations/nearest-location.jade',
          './client/app/weather-map/locations/list-locations/list-locations.html': './client/app/weather-map/locations/list-locations/list-locations.jade',
          './client/app/weather-map/weather-map.html': './client/app/weather-map/weather-map.jade'
        }
      }
    },

    watch: {
      options: {
        livereload: 35729
      },

      scripts: {
        files: ['./client/app/**/*.js', './client/app/*.js', './components/**/*.js', 'app.js', 'server.js'],
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
        files: ['./client/app/*/*.jade',
                './client/app/*/*/*.jade',
                './client/app/*/*/*/*.jade',
                './client/index.jade'],
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