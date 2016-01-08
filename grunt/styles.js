
module.exports = function gruntExport(grunt) {
  grunt.config.merge({
    less: {
      app: {
        options: {
          sourceMap:true
        },
        files:{
          '<%= dirs.css.output %>/app-init.css':  '<%= dirs.css.input %>/app-init.less',
          '<%= dirs.css.output %>/app.css':       '<%= dirs.css.input %>/app.less'
          //'<%= dirs.css.output %>/bootstrap.css': '<%= dirs.css.input %>/bootstrap.less'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
};