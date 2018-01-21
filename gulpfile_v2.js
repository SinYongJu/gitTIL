const gulp = require('gulp');

// gulp-concat은 gulp를 이용한 file 조합하기
const concat = require('gulp-concat');


/*
*
* gulp.task(name[, deps], func);
*
* name : 실행 업무 네임
*
* deps : 실행시 지정한 task의 업무를 실행하기 위해서 먼저 실행해야 하는 task의 []나열
*
* ##
* deps의 task의 지정에 있어서 스크립트는 위에서 아래로 읽어 감으로 만약 어떤 task를 지정하고 deps를 지정한다면
* 그 deps의 task는 실행해야하는 task들 보다 먼저 쓰여야한다.
* 선행되어야하는 task가 없다면 굳이 선언하지 않아도 된다.
* ##
*
* func : 실행 업무 프로세스들을 정의하는
*
*
* */

gulp.task('combine:js',function(){
   return gulp.src( ['src/js/*.js'] ) // 경로 지정을 하면 우선적으로 해당 경로의 파일들을 읽어와서 합칠 꺼야!
         .pipe( concat('combined.js') )
       .pipe( gulp.dest('dist/js') );
});

gulp.task('default', ['combine:js']);


