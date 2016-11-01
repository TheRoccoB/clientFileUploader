module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: {
                        path: '.',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*'],
                tasks: [],
                options: {
                    livereload:true
                },
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['connect:server', 'watch']);

};