module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            options: {
                update: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public_html/css/blocks',
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
                //command: 'node server.js',
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
                    almond: true,
                    baseUrl: "public_html/js",
                    mainConfigFile: "public_html/js/main.js",
                    name: "main",
                    optimize: "none",
                    out: "public_html/js/build/main.js"
                }
            }
        },
        concat: {
            build: {
                separator: ';\n',
                src: [
                      'public_html/js/lib/almond.js',
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
        compass: {
            
                dist: {
                    options: {
                        sassDir: 'public_html/css/blocks',
                        cssDir: 'public_html/css/build',
                        //environment: 'development',
                        outputStyle: 'compressed'
                    }
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
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('test', ['qunit:all']);
    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('compile', ['sass']);

    
    grunt.registerTask(
        'build',
            [
                'fest', 'requirejs:build',
                'concat:build', 'uglify:build', 
                'compass:dist'
            ]
    );
};
