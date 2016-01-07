
module.exports = function gruntExport(grunt, fileToBust) {

  grunt.config.merge({
    cachebust: {
      default_options: {
        files: [{
          expand: true,
          cwd: '',
          src: fileToBust,
          dest: ''
        }]
      }
    }
  });
  grunt.loadNpmTasks('grunt-cachebust');
};