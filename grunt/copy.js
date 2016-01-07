
module.exports = function gruntExport(grunt) {

  var copyDir = function(from, to, src){
    src = src || ['**/*'];
    return {
      nonull: true,
      expand: true,
      cwd: from,
      src: src,
      dest:to
    };
  };

  grunt.config.merge({
    copy: {
      // import bootstrap themes
      //bootstrap:copyDir('<%= dirs.bootstrap.input %>/', '<%= dirs.bootstrap.output %>'),
      // font-awesome fonts
      //fonts:copyDir('<%= dirs.bower %>/font-awesome/fonts', '<%= dirs.static %>/fonts'),
      // af-lib images
      //afLibImages:copyDir('<%= dirs.afLib %>/assets/img', '<%= dirs.static %>/img')
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
};