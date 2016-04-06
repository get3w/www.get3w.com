var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpLess = require('gulp-less');
var combiner = require('stream-combiner2');

function buildless(name) {
    var combined = combiner.obj([
        gulp.src(['./less/' + name + '/index.less']),
        gulpLess(),
        concat(name + '.css'),
        gulp.dest('./assets/css')
    ]);
    combined.on('error', console.error.bind(console));
    return combined;
}

gulp.task('less', function() {
    buildless('web');
});
