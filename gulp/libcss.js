var gulp = require('gulp');
var concat = require('gulp-concat');
gulp.task('libcss', function() {
  gulp.src([
          './bower_components/animate.css/animate.min.css',
          './node_modules/sweetalert/dist/sweetalert.css',
          './bower_components/fontawesome/css/font-awesome.min.css',
          './bower_components/octicons/octicons/octicons.css',
          './bower_components/csstoolkits/ct.min.css',
      ])
      .pipe(concat('lib-all.css'))
      .pipe(gulp.dest('./assets/css'));
  gulp.src(['./bower_components/octicons/octicons/**'])
      .pipe(gulp.dest('./assets/css'));
  gulp.src(['./bower_components/fontawesome/fonts/**'])
      .pipe(gulp.dest('./assets/fonts'));
});
