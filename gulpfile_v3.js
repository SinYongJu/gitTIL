const gulp = require('gulp');

// gulp-concat은 gulp를 이용한 file 조합하기
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const srcmap= require('gulp-sourcemaps');
const scss = require('gulp-sass');


const src = 'src';
const dist = 'dist';
const paths = {
               js : src + '/js/**/*.js',
               scss : src + '/sass/**/*.scss'
               };

const scssOptions = {
    /** * outputStyle (Type : String , Default : nested) * CSS의 컴파일 결과 코드스타일 지정 * Values : nested, expanded, compact, compressed */
    outputStyle : "nested",
    /** * indentType (>= v3.0.0 , Type : String , Default : space) * 컴파일 된 CSS의 "들여쓰기" 의 타입 * Values : space , tab */
    indentType : "space", /** * indentWidth (>= v3.0.0, Type : Integer , Default : 2) * 컴파일 된 CSS의 "들여쓰기" 의 갯수 */
    indentWidth : 1, // outputStyle 이 nested, expanded 인 경우에 사용
    /** * precision (Type : Integer , Default : 5) * 컴파일 된 CSS 의 소수점 자리수. */
    precision: 6, /** * sourceComments (Type : Boolean , Default : false) * 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시. */
    sourceComments: true
};






gulp.task('watch', function () {
     gulp.watch(paths.js, ['js:combine']);
     gulp.watch(paths.scss, ['scss:compile']);
});



gulp.task('scss:compile', function () {
    return gulp.src(paths.scss)
        .pipe(srcmap.init())
        .pipe(scss(scssOptions).on('error', scss.logError))
        .pipe(srcmap.write())
        .pipe(gulp.dest(dist + '/css'))
});



gulp.task('combine:js',function(){
   return gulp.src( paths.js ) // 경로 지정을 하면 우선적으로 해당 경로의 파일들을 읽어와서 합칠 꺼야!
         .pipe( concat('combined.js') )
         .pipe( gulp.dest(dist+'/js') )
         .pipe( uglify())
         .pipe( rename('combine.min.js') )
         .pipe( gulp.dest(dist+'/js'))
});



// gulp라고 실행하면 기본 default가 실행된다.
gulp.task('default', ['combine:js','scss:compile','watch'],function(){
    console.log("You have done!")
});


