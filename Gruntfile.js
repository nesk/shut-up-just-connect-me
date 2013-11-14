module.exports = function(grunt) {

    grunt.initConfig({

        clean: ['build'],

        less: {
            popup: {
                files: {
                    'build/stylesheets/popup.css': 'stylesheets/popup.less',
                    'build/stylesheets/transition.css': 'stylesheets/transition.less'
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
            },

            transition: {
                files: {
                    'build/scripts/transition.js': ['scripts/transition.js']
                }
            }
        },

        copy: {
            manifest: {
                src: 'manifest.json',
                dest: 'build/manifest.json'
            },

            assets: {
                src: 'assets/**',
                dest: 'build/'
            },

            templates: {
                src: 'templates/**',
                dest: 'build/'
            }
        },

        compress: {
            release: {
                options: {
                    archive: 'release.zip',
                    pretty: true
                },

                expand: true,
                cwd: 'build',
                src: ['**']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', ['clean', 'less', 'uglify', 'copy']);
    grunt.registerTask('release', ['default', 'compress']);

};