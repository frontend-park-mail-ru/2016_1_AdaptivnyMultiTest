module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            options: {
                update: true,
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'templates/style/',
                    src: ['*.scss'],
                    dest: 'public_html/css',
                    ext: '.css'
                }]
            }
        },
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            server: {
                command: 'java -jar 2016-02-Adaptive-MultiTest-1.0.jar  8080'
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public_html/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            sass: {
                files: ['public_html/css/blocks/**/*.scss'],
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public_html/js/**/*.js',
                    'public_html/css/**/*.css'
                ],
            }
        },
        concurrent: {
            target: ['watch', 'shell'],
            options: {
                logConcurrentOutput: true
            }
        },
        qunit: {
            all: ['./public_html/tests/index.html']
        },

        requirejs: {
            build: {
                options: {
                    //almond: true,
                    baseUrl: "public_html/js",
                    mainConfigFile: "public_html/js/main.js",
                    name: "main",
                    optimize: "none",
                    out: "public_html/js/build/main.js",

                    paths: {
                        jquery: "empty:",
                        underscore: "empty:",
                        backbone: "empty:",
                        bootstrap: "empty:"
                    }
                }
            }
        },
        concat: {
            build: {
                separator: ';\n',
                src: [
                      'public_html/js/lib/require.js',
                      'public_html/js/build/main.js'
                ],
                dest: 'public_html/js/build.js'
            }
        },
        uglify: {
            build: {
                files: {
                    'public_html/js/build.min.js': 
                            ['public_html/js/build.js']
                }
            }
        },
        cssmin: {
            dist: {
                files: [
                    { src: 'public_html/css/main.css', dest: 'public_html/css/build/main-min.css' },
                    { src: 'public_html/css/tidyBootstrap.css', dest: 'public_html/css/build/tidyBootstrap-min.css' }
                ]
            }
        },
        imagemin: {
            png: {
              options: {
                optimizationLevel: 7
              },
              files: [
                {
                  expand: true,
                  cwd: 'public_html/static/',
                  src: ['**/*.png'],
                  dest: 'public_html/static/compressed/',
                  ext: '.png'
                }
              ]
            },
            jpg: {
              options: {
                progressive: true
              },
              files: [
                {
                  expand: true,
                  cwd: 'public_html/static/',
                  src: ['**/*.jpg'],
                  dest: 'public_html/static/compressed/',
                  ext: '.jpg'
                }
              ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-sass');

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    //grunt.loadNpmTasks('grunt-contrib-compass');
    //grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('compile', ['sass']);
    grunt.registerTask('imageMin', ['imagemin'])

    grunt.registerTask(
        'build',
            [
                'fest', 'requirejs:build',
                'concat:build', 'uglify:build', 
                'cssmin:dist'
            ]
    );
};
