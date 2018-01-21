const gulp = require('gulp');

// gulp-concat은 gulp를 이용한 file 조합하기
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const srcmap= require('gulp-sourcemaps');
const scss = require('gulp-sass');
const browsersync = require('browser-sync').create(); // 브라우저 싱크의 호출

/*
* BrowserSync는 Gulp 플러그인이 아닌 node.js 기반의 어플리케이션이지만 Gulp 와 매끄럽게 연동해서 사용할 수 있습니다.

  자체적으로 다양한 옵션을 가진 미니 웹서버 기능을 지원하고, 파일 변경시에 이를 자동으로 감지해서 브라우저 Refresh 를 수행할 수 있습니다.
*
*
* 요놈은 좀 알아봐야 할 듯 지금은 목적상 일단 패스!
* */

const src = 'src';
const dist = 'dist';
const paths = {
               js : src + '/js/**/*.js',
               scss : src + '/scss/**/*.scss'
               };

const scssOptions = {
    outputStyle : "compressed",
    indentType : "space",
    indentWidth : 1,
    precision: 6,
    sourceComments: true
};




gulp.task('html',function(){
    return gulp.src('./**/*/*.html')
               .pipe( browsersync.reload({
                        stream : true
               })
           );
})





gulp.task('compile:scss', function () {
    return gulp.src(paths.scss)
        .pipe(srcmap.init())
        .pipe(scss(scssOptions).on('error', scss.logError))
        .pipe(srcmap.write())
        .pipe(gulp.dest(dist + '/css'))
        .pipe( browsersync.reload({
            stream : true
        })
        );
});



gulp.task('combine:js',function(){
   return gulp.src( paths.js ) // 경로 지정을 하면 우선적으로 해당 경로의 파일들을 읽어와서 합칠 꺼야!
         .pipe( concat('combined.js') )
         .pipe( gulp.dest(dist+'/js') )

         // .pipe( uglify())
         // .pipe( rename('combine.min.js') )
         // .pipe( gulp.dest(dist+'/js'))

       .pipe( browsersync.reload({
             stream : true
         })
         );
});



gulp.task('browser-sync', ['html', 'combine:js', 'compile:scss'], function () {

    return browsersync.init({
        port : 3333,
        server : {
            baseDir : './'
        }
    });


});


gulp.task('watch', function () {
    gulp.watch('./**/*/*.html',['html'])
    gulp.watch(paths.js, ['combine:js']);
    gulp.watch(paths.scss, ['compile:scss']);
});




// gulp라고 실행하면 기본 default가 실행된다.
gulp.task('default', ['browser-sync','watch'],function(){
    console.log("You have done!")
});


/*
* gulp에서의 프로세스 스트림
*
* src ---> task 1 ----> task 2 -----> gulp.dest() ---> target
*
*
* */
