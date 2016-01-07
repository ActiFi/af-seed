
module.exports = function gruntExport(grunt, port) {
  grunt.config.merge({
    nodemon: {
      dev: {
        script: 'app.js',
        options:{
          watch:['server/**/*.js', 'app.js', 'config.js'],
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            //nodemon.on('config:update', function () {
            //  // Delay before server listens on port
            //  setTimeout(function() {
            //    require('open')('http://localhost:'+port);
            //  }, 1000);
            //});
            // refreshes browser when server reboots
            nodemon.on('restart', function () {
              setTimeout(function() {
                require('fs').writeFileSync(
                    '.nodemon',
                    '// file is watched by grunt and is modified by nodemon after server restart is complete. ' + new Date().getTime()
                );
              }, 1000);
            });
          }
        }

      }
    }
  });
  grunt.loadNpmTasks('grunt-nodemon');
};