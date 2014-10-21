// -*- coding: utf-8 -*-
var gulp = require('gulp');
var child_process = require('child_process');

var cdn_dir = 'static/';
var bower_dir = 'bower_components/';

function cdn(path){
    return 'static/cdn/' + path;
}

function lib(path){
    return 'lib/' + path;
}

function bower(path){
    return 'bower_components/' + path;
}

// gulp.task('make', function(){
//     child_process.exec('python ./build.py src .', function (err, stdout, stderr){
//         console.log(stdout);
//         console.log(stderr);
//     });
// });

gulp.task('angular', function(){
    gulp.src(bower('angular/angular.min.js'))
        .pipe(gulp.dest(lib('angular')));
    gulp.src(bower('angular/angular.min.js.map'))
        .pipe(gulp.dest(lib('angular')));
});

gulp.task('angular-animate', function(){
    gulp.src(bower('angular-animate/angular*.js'))
        .pipe(gulp.dest(lib('angular-animate')));
    gulp.src(bower('angular-animate/angular*.map'))
        .pipe(gulp.dest(lib('angular-animate')));
});

gulp.task('angular-resource', function(){
    gulp.src(bower('angular-resource/angular*.js'))
        .pipe(gulp.dest(lib('angular-resource')));
    gulp.src(bower('angular-resource/angular*.map'))
        .pipe(gulp.dest(lib('angular-resource')));
});

gulp.task('angular-route', function(){
    gulp.src(bower('angular-route/angular*.js'))
        .pipe(gulp.dest(lib('angular-route')));
    gulp.src(bower('angular-route/angular*.map'))
        .pipe(gulp.dest(lib('angular-route')));
});

gulp.task('font-awesome', function(){
    gulp.src(bower('font-awesome/css/**'))
        .pipe(gulp.dest(lib('font-awesome/css')));
    gulp.src(bower('font-awesome/fonts/**'))
        .pipe(gulp.dest(lib('font-awesome/fonts')));
});

gulp.task('jquery', function (){
    gulp.src(bower('jquery/dist/**'))
        .pipe(gulp.dest(lib('jquery')));
});

gulp.task('jquery-ui', function (){
    gulp.src(bower('jquery-ui/ui/**'))
        .pipe(gulp.dest(lib('jquery-ui/ui')));
    gulp.src(bower('jquery-ui/themes/**'))
        .pipe(gulp.dest(lib('jquery-ui/themes')));
    gulp.src(bower('jquery-ui/jquery-ui.js'))
        .pipe(gulp.dest(lib('jquery-ui')));
    gulp.src(bower('jquery-ui/jquery-ui.min.js'))
        .pipe(gulp.dest(lib('jquery-ui')));
});

gulp.task('fancyInput', function(){
    gulp.src(bower('fancyInput/fancyInput.js'))
        .pipe(gulp.dest(lib('fancyInput/')));
    gulp.src(bower('fancyInput/fancyInput.css'))
        .pipe(gulp.dest(lib('fancyInput/')));
});

gulp.task('reveal.js', function(){
    gulp.src(bower('reveal.js/css/**'))
        .pipe(gulp.dest(lib('reveal.js/css')));
    gulp.src(bower('reveal.js/js/**'))
        .pipe(gulp.dest(lib('reveal.js/js')));
    gulp.src(bower('reveal.js/plugin/**'))
        .pipe(gulp.dest(lib('reveal.js/plugin')));
    gulp.src(bower('reveal.js/lib/**'))
        .pipe(gulp.dest(lib('reveal.js/lib')));
});

gulp.task('bootstrap', function(){
    gulp.src(bower('bootstrap/dist/css/**'))
        .pipe(gulp.dest(lib('bootstrap/css')));

    gulp.src(bower('bootstrap/dist/js/**'))
        .pipe(gulp.dest(lib('bootstrap/js')));

    gulp.src(bower('bootstrap/dist/fonts/**'))
        .pipe(gulp.dest(lib('bootstrap/fonts')));
});

gulp.task('d3', function(){
    gulp.src(bower('d3/d3.**'))
        .pipe(gulp.dest(lib('d3')));
});

gulp.task('nvd3', function(){
    gulp.src(bower('nvd3/nv.d3.**'))
        .pipe(gulp.dest(lib('nvd3')));
});

gulp.task('backbone', function (){
    gulp.src(bower('backbone/backbone.js'))
        .pipe(gulp.dest(lib('backbone')));
});

gulp.task('backbone.babysitter', function (){
    gulp.src(bower('backbone.babysitter/lib/**'))
        .pipe(gulp.dest(lib('backbone.babysitter/lib')));
});

gulp.task('backbone.marionette', function (){
    gulp.src(bower('backbone.marionette/lib/**'))
        .pipe(gulp.dest(lib('backbone.marionette/lib')));
});

gulp.task('backbone.wreqr', function (){
    gulp.src(bower('backbone.wreqr/lib/**'))
        .pipe(gulp.dest(lib('backbone.wreqr/lib')));
});

gulp.task('momentjs', function (){
    gulp.src(bower('momentjs/moment.js'))
        .pipe(gulp.dest(lib('momentjs')));
});

gulp.task('pnotify', function (){
    gulp.src(bower('pnotify/**'))
        .pipe(gulp.dest(lib('pnotify')));
});

gulp.task('react', function (){
    gulp.src(bower('react/**'))
        .pipe(gulp.dest(lib('react')));
});

gulp.task('require', function (){
    gulp.src(bower('require/build/**'))
        .pipe(gulp.dest(lib('require/build')));
});

gulp.task('underscore', function (){
    gulp.src(bower('underscore/underscore.js'))
        .pipe(gulp.dest(lib('underscore')));
});

gulp.task('vis', function (){
    gulp.src(bower('vis/dist/**'))
        .pipe(gulp.dest(lib('vis/dist')));
});

gulp.task('vue', function (){
    gulp.src(bower('vue/dist/**'))
        .pipe(gulp.dest(lib('vue/dist')));
});

gulp.task('all', function(){
    var install_libs = [
        'angular',
        'angular-animate',
        'angular-resource',
        'angular-route',
        'bootstrap',
        'font-awesome',
        'fancyInput',
        'font-awesome',
        'fancyInput',
        'jquery',
        'jquery-ui',
        'd3',
        'nvd3',
        'backbone',
        'backbone.babysitter',
        'backbone.marionette',
        'backbone.wreqr',
        'momentjs',
        'pnotify',
        'react',
        'require',
        'underscore',
        'vis',
        'vue']

    install_libs.forEach(function (name) {
        gulp.run(name);
    });

    // gulp
    //     .run('bootstrap')
    //     .run('font-awesome')
    //     .run('fancyInput')
    //     .run('font-awesome')
    //     .run('fancyInput')
    //     .run('jquery')
    //     .run('jquery-ui')
    //     .run('d3')
    //     .run('nvd3')
    //     .run('backbone')
    //     .run('backbone.babysitter')
    //     .run('backbone.marionette')
    //     .run('backbone.wreqr')
    //     .run('momentjs')
    //     .run('pnotify')
    //     .run('react')
    //     .run('require')
    //     .run('underscore')
    //     .run('vis')
    //     .run('vue');
    // gulp.run('angular');
    // gulp.run('reveal.js');
    // gulp.run('make');
    // angular
    // gulp.src('client/img/**')\
    //     .pipe(gulp.dest('build/img'));
    // gulp.src('client/css/**')\
    //     .pipe(gulp.dest('build/css'));
    // gulp.src('client/*.html')\
    //     .pipe(gulp.dest('build'));
});

gulp.task('default', function(){
    gulp.run('all');
});
