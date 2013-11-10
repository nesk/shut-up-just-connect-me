module.exports = function(grunt) {

    grunt.initConfig({

        clean: ['build'],

        less: {
            popup: {
                files: {
                    'build/stylesheets/popup.css': 'stylesheets/popup.less'
                }
            }
        },

        uglify: {
            background: {
                files: {
                    'build/scripts/background.js': ['scripts/auth.js', 'scripts/background.js']
                }
            },

            popup: {
                files: {
                    'build/scripts/popup.js': ['scripts/auth.js', 'scripts/popup.js']
                }
            }
        },

        copy: {
            manifest: {
                src: 'manifest.json',
                dest: 'build/manifest.json'
            },

            fonts: {
                src: 'fonts/*',
                dest: 'build/'
            },

            icons: {
                src: 'icons/*',
                dest: 'build/'
            },

            images: {
                src: 'images/*',
                dest: 'build/'
            },

            templates: {
                src: 'templates/*',
                dest: 'build/'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'less', 'uglify', 'copy']);

};