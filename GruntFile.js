var config = require('./config');

module.exports = function(grunt) {

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  console.log(config.dirs.static)
  grunt.initConfig({

    // structure of our app
    dirs:{
      client: config.dirs.client,
      views:  config.dirs.views,
      static: config.dirs.static,
      bower:'bower_components',
      js:{
        output:'<%= dirs.static %>/js'
      },
      css:{
        input:'<%= dirs.client %>/styles',
        output:'<%= dirs.static %>/css'
      }
    },

    watch: {
      options: { livereload: true },
      html: {
        files: ['<%= dirs.views %>/**/*.html'],
        tasks: []
      },
      scripts: {
        files: ['<%= dirs.client %>/scripts/**/*.js', '<%= dirs.views %>/**/*.js'],
        tasks: ['concat:app'],
        options: { livereload: false } // reload fires compiled static/js changes
      },
      styles: {
        files: ['<%= dirs.css.input %>/**/*.less'],
        tasks: ['less'],
        options: { livereload: false } // reload fires compiled css changes
      },
      // watch css for livereload
      js:{  files: ['<%= dirs.js.output %>/**/*.js'], tasks: [] },
      css:{ files: ['<%= dirs.css.output %>/**/*.css'], tasks: [] },
      server: {
        files: ['.nodemon'] // this file gets written to after server restart
      }
    },

    concurrent: {
      build:     ['less', 'concat:app'],
      buildprod: ['less', 'concat'],
      server:    ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  //require('./grunt/copy.js')(grunt);
  require('./grunt/concat.js')(grunt);
  require('./grunt/cachebust.js')(grunt, ['<%= dirs.views ?>/index.html']);
  require('./grunt/styles.js')(grunt);
  require('./grunt/nodemon.js')(grunt, process.env.PORT || 3002);


  // dev
  grunt.registerTask('default', ['concurrent:build', 'concurrent:server']);
  // prod
  grunt.registerTask('prod',    ['concurrent:buildprod', 'cachebust']);
  // or... just run server...
  grunt.registerTask('server',   ['concurrent:server']);


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
};