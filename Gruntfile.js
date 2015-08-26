/* global module, require, process */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bowerrc: grunt.file.readJSON('.bowerrc'),
        clean: {
            preBuild: ['dist', '.tmp'],
            postBuild: ['.tmp', 'backup', 'dist/app', 'dist/libs'],
        },
        dirs: {
            'vendor': '<%= bowerrc.directory %>',
            'bootstrap': {
                'js': '<%= dirs.vendor %>/bootstrap/dist/js',
                'css': '<%= dirs.vendor %>/bootstrap/dist/css',
            },
            'css': 'css',
            'less': 'less',
            'js': 'js',
        },
        copy: {
            fontawesome: {
                expand: true,
                cwd: 'src/libs/fontawesome/fonts/',
                src: ['*.{eot,svg,ttf,woff,woff2}'],
                dest: 'dist/fonts/',
            },
        },
        useminPrepare: {
            html: 'dist/index.html',
            css: ['dist/css/**.css', 'dist/libs/*/**.css'],
        },
        usemin: {
            html: 'dist/index.html',
            css: ['dist/css/**.css', 'dist/libs/*/**.css'],
        },
        uglify: {
            options: {
                report: 'min',
                mangle: true,
            },
        },
        rev: {
            assets: {
                files: [{
                    src: ['dist/js/player.min.js', 'dist/css/player.min.css'],
                }],
            },
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyCSS: true,
                    conservativeCollapse: true,
                },
                files: {
                    'dist/index.html': 'dist/index.html',
                },
            },
        },
        eslint: {
            target: ['Gruntfile.js', 'src/app/**.js', 'src/app/**/**.js', 'src/app/*/*/**.js', 'src/app/*/*/*/**.js', 'js/**.js'],
        },
        githooks: {
            all: {
                'pre-commit': 'test',
            },
        },
        html2js: {
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    minifyCSS: true,
                    conservativeCollapse: true,
                },
            },
            build: {
                src: ['dist/app/*/**.html', 'dist/app/*/*/**.html', 'dist/app/*/*/*/**.html'],
                dest: 'dist/app/00-templates.js',
                options: {
                    base: 'dist',
                    rename: function (moduleName) {
                        return '/' + moduleName;
                    },
                    module: 'templates',
                },
            },
            dev: {
                src: ['src/app/*/**.html', 'src/app/*/*/**.html', 'src/app/*/*/*/**.html'],
                dest: 'dev/app/00-templates.js',
                options: {
                    base: 'src',
                    rename: function (moduleName) {
                        return '/' + moduleName;
                    },
                    module: 'templates',
                },
            },
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
                add: true,
                remove: true,
            },
            build: {
                files: [
                    {
                        expand: true,
                        src: ['.tmp/concat/js/player.min.js'],
                    },
                ],
            },
        },
        includeSource: {
            build: {
                files: {
                    'dist/index.html': 'dist/index.html',
                },
                options: {
                    basePath: 'dist/app/',
                    baseUrl: 'app/',
                    ordering: 'top-down',
                },
            },
            dev: {
                files: {
                    'dev/index.html': 'dev/index.html',
                },
                options: {
                    basePath: 'dev/app/',
                    baseUrl: 'app/',
                    ordering: 'top-down',
                },
            },
        },
        watch: {
            dev: {
                files: ['src/*.*', 'src/*/*.*', 'src/app/*.*', 'src/app/*/*.*', 'src/app/*/*/*.*', 'src/app/*/*/*/*.*'],
                tasks: ['rsync:dev', 'babel:dev', 'html2js:dev', 'includeSource:dev'],
            },
        },
        express: {
            dev: {
                options: {
                    bases: ['dev/'],
                    port: process.env.DEV_PORT || 4000,
                    hostname: '*',
                    server: 'dev-server.js',
                    livereload: true,
                },
            },
        },
        rsync: {
            options: {
                args: ['--update --delete-excluded --verbose'],
                exclude: ['*~'],
                recursive: true,
            },
            dev: {
                options: {
                    src: 'src/',
                    dest: 'dev/',
                    exclude: ['*~', '*.tests.js'],
                    'delete': true,
                },
            },
            test: {
                options: {
                    src: 'src/',
                    dest: 'dev/',
                    exclude: ['*~'],
                    'delete': true,
                },
            },
            build: {
                options: {
                    src: 'src/',
                    dest: 'dist/',
                    exclude: ['*~', '*.tests.js'],
                    'delete': true,
                },
            },
        },
        karma: {
            unit: {
                options: {
                    logLevel: 'ERROR',
                    reporters: ['mocha'],
                    plugins: ['karma-phantomjs-launcher', 'karma-jasmine', 'karma-mocha-reporter'],
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        'src/libs/angular/angular.js',
                        'src/libs/angular-mocks/angular-mocks.js',
                        'src/libs/angular-animate/angular-animate.js',
                        'src/libs/angular-sanitize/angular-sanitize.js',
                        'src/libs/angular-strap/dist/angular-strap.js',
                        'src/libs/angular-strap/dist/angular-strap.tpl.js',
                        'src/libs/angular-fontawesome/dist/angular-fontawesome.js',
                        'dev/app/00-templates.js',
                        'dev/app/**.js',
                        'dev/app/*/**.js',
                        'dev/app/*/*/**.js',
                        'dev/app/*/*/*/**.js',
                    ],
                },
            },
        },
        babel: {
            options: {
                sourceMap: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['*.js', 'app/*.js', 'app/*/*.js', 'app/*/*/*.js', 'app/*/*/*/*.js'],
                    dest: 'dist/'
                }]
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['*.js', 'app/*.js', 'app/*/*.js', 'app/*/*/*.js', 'app/*/*/*/*.js'],
                    dest: 'dev/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('install-hook', function () {
        grunt.loadNpmTasks('grunt-githooks');
        var fs = require('fs');
        grunt.file.copy('hooks/commit-msg', '.git/hooks/commit-msg');
        fs.chmodSync('.git/hooks/commit-msg', '755');
        grunt.task.run('githooks');
    });

    grunt.registerTask('build', function () {
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-usemin');
        grunt.loadNpmTasks('grunt-rev');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-html2js');
        grunt.loadNpmTasks('grunt-ng-annotate');
        grunt.loadNpmTasks('grunt-include-source');
        grunt.loadNpmTasks('grunt-rsync');
        grunt.task.run([
            'test',
            'clean:preBuild', // Clean up to make sure nothing breaks the build
            'rsync:build', // Copy the source to dist/ to start the build
            'copy:fontawesome', // Copy the Font Awesome fonts to dist/
            'html2js:build', // Convert the templates to a JS cache file
            'babel:build', // Convert ES6 to ES5
            'includeSource:build',
            'useminPrepare',
            'concat', // Concat all files
            'ngAnnotate:build', // Add DI annotations
            'uglify', // Uglify the JS
            'cssmin', // Uglify the CSS
            'rev', // Add a revision tag to assets
            'usemin',
            'htmlmin', // Minify the HTML
            'clean:postBuild', // Clean up
        ]);
    });

    grunt.registerTask('dev', function () {
        grunt.loadNpmTasks('grunt-express');
        grunt.loadNpmTasks('grunt-eslint');
        grunt.loadNpmTasks('grunt-karma');
        grunt.task.run([
            'rsync:dev',
            'html2js:dev',
            'babel:dev',
            'includeSource:dev',
            'express',
            'watch',
        ]);
    });

    grunt.registerTask('test', function () {
        grunt.loadNpmTasks('grunt-html2js');
        grunt.loadNpmTasks('grunt-eslint');
        grunt.loadNpmTasks('grunt-karma');
        grunt.task.run([
            'rsync:test',
            'html2js:dev',
            'babel:dev',
            'eslint',
            'karma',
        ]);
    });

    grunt.registerTask('default', ['build']);

};
