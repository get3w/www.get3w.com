var gulp = require('gulp');
var requireDir = require('require-dir')
var runSequence = require('run-sequence').use(gulp)

requireDir('./gulp', { recurse: true })

gulp.task('all', function() {
  runSequence('pack')
})
