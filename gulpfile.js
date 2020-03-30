const gulp = require('gulp');
//引入gulp依赖文件。下面的执行都要依赖他。
const mihtml = require('gulp-minify-html');
gulp.task('mhtml',function(){
    return gulp.src('html/*.html')
    .pipe(mihtml())
    .pipe(gulp.dest('dist/html'));
})

// const miscss = require('gulp-sass');
// const sourcemap = require('gulp-sourcemaps');
// const micss = require('gulp-clean-css');

// gulp.task('msass',function(){
//     return gulp.src('sass/*.scss')
//     // .pipe(sourcemap.init())
//     .pipe(miscss())
//     // .pipe(micss())
//     // .pipe(sourcemap.write('.'))
//     .pipe(gulp.dest('dist/css'));
// })
// gulp.task('micss',function(){
//     return gulp.src
// })


