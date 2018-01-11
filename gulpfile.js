var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    htmlmin = require('gulp-htmlmin');

// Styles
gulp.task('styles', function() {
    return gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// html
gulp.task('Htmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('assets/html'))
        .pipe(notify({ message: 'Html task complete' }));
});


// Watch
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/sass/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('src/js/*.js', ['scripts']);
  // Watch image files
  gulp.watch('src/images/*', ['images']);
  // Watch html files
  gulp.watch('src/html/**/*.html', ['Htmlmin']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in assets/, reload on change
  gulp.watch(['assets/*']).on('change', livereload.changed);
});

// Default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts', 'images');
});