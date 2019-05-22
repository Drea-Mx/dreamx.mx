var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var cache = require('gulp-cache');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('default', ['css', 'javascript', 'pug', 'imagenes', 'videos' ], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("src/js/*.js", ['javascript']).on('change', browserSync.reload);
    gulp.watch("src/sass/**/*.+(scss|sass)", ['css']);
    gulp.watch("src/views/**/*.pug", ['pug']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('pug', function buildHTML() {
    return gulp.src('src/views/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('app'))

  });

  gulp.task('javascript', function () {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('app/js/dist'))
  });

  gulp.task('videos', function () {
    gulp.src('src/videos/*')
        .pipe(gulp.dest('app/videos'))
  });

gulp.task('imagenes', function(){
    gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/img'))
    }
);



gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
});




gulp.task('css', function(){
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

// gulp.watch('archivo', [tarea]);
