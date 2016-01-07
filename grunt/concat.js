
module.exports = function gruntExport(grunt) {

  var concatJs = function(filename, files){
    return {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
        sourceMap:true
      },
      nonull: true,
      dest:'<%= dirs.js.output %>/'+filename,
      src: files
    }
  };

  grunt.config.merge({
    concat: {
      app: concatJs('app.js', [
        '<%= dirs.client %>/scripts/app.init.js',
        '<%= dirs.client %>/scripts/app.routes.js',
        '<%= dirs.client %>/scripts/app.ctrl.js',
        '<%= dirs.client %>/scripts/**/*.js',
        '<%= dirs.views %>/**/*.js'
      ]),
      libs: concatJs('libs.js', [
        // angular
        '<%= dirs.bower %>/jquery/dist/jquery.min.js',
        '<%= dirs.bower %>/amplify/lib/amplify.core.js',
        '<%= dirs.bower %>/amplify/lib/amplify.store.js',
        // angular
        '<%= dirs.bower %>/angular/angular.js',
        '<%= dirs.bower %>/angular-sanitize/angular-sanitize.js',
        '<%= dirs.bower %>/angular-animate/angular-animate.js',
        '<%= dirs.bower %>/angular-messages/angular-messages.js',
        '<%= dirs.bower %>/angular-ui-router/release/angular-ui-router.js',
        // util
        '<%= dirs.bower %>/lodash/lodash.js',
        '<%= dirs.bower %>/moment/moment.js'
      ]),
      libsMin: concatJs('libs.min.js', [
        // angular
        '<%= dirs.bower %>/jquery/dist/jquery.min.js',
        '<%= dirs.bower %>/amplify/lib/amplify.core.min.js',
        '<%= dirs.bower %>/amplify/lib/amplify.store.min.js',
        // angular
        '<%= dirs.bower %>/angular/angular.min.js',
        '<%= dirs.bower %>/angular-sanitize/angular-sanitize.min.js',
        '<%= dirs.bower %>/angular-animate/angular-animate.min.js',
        '<%= dirs.bower %>/angular-messages/angular-messages.min.js',
        '<%= dirs.bower %>/angular-ui-router/release/angular-ui-router.min.js',
        // util
        '<%= dirs.bower %>/lodash/lodash.min.js',
        '<%= dirs.bower %>/moment/min/moment.min.js'
      ])
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
};