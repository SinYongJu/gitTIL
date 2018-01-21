const gulp = require('gulp');

// gulp-concat은 gulp를 이용한 file 조합하기
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const srcmap= require('gulp-sourcemaps');
const scss = require('gulp-sass');
const livereload = require('gulp-livereload'); //사용 위해서는 크롬의 확장 프로그램을 설치해야해요 그래야 라이브 로드를 사용 할 수 있어요.

const src = 'src';
const dist = 'dist';
const paths = {
               js : src + '/js/**/*.js',
               scss : src + '/sass/**/*.scss'
               };

const scssOptions = {
    outputStyle : "nested",
    indentType : "space",
    indentWidth : 1, 
    precision: 6,
    sourceComments: true
};




gulp.task('html',function(){
    return gulp.src('./**/*/*.html').pipe( livereload() );
})





gulp.task('compile:scss', function () {
    return gulp.src(paths.scss)
        .pipe(srcmap.init())
        .pipe(scss(scssOptions).on('error', scss.logError))
        .pipe(srcmap.write())
        .pipe(gulp.dest(dist + '/css'))
        .pipe( livereload() )
});



gulp.task('combine:js',function(){
   return gulp.src( paths.js ) // 경로 지정을 하면 우선적으로 해당 경로의 파일들을 읽어와서 합칠 꺼야!
         .pipe( concat('combined.js') )
         .pipe( gulp.dest(dist+'/js') )
         .pipe( uglify())
         .pipe( rename('combine.min.js') )
         .pipe( gulp.dest(dist+'/js'))
         .pipe( livereload() )
});



gulp.task('live', ['html', 'combine:js', 'compile:scss'], function () {

    /** * livereload.listen() 옵션값으로 기본 경로를 지정 */
            livereload.listen( { basePath: dist } );

});


gulp.task('watch', function () {
    gulp.watch('./**/*/*.html',['html'])
    gulp.watch(paths.js, ['js:combine']);
    gulp.watch(paths.scss, ['scss:compile']);
});




// gulp라고 실행하면 기본 default가 실행된다.
gulp.task('default', ['live','watch'],function(){
    console.log("You have done!")
});


/*
* gulp에서의 프로세스 스트림
*
* src ---> task 1 ----> task 2 -----> gulp.dest() ---> target
*
*
* */
