
// 引入 gulp
var gulp = require( 'gulp' ),

// 引入编译less的插件
    less = require( 'gulp-less' );

// 定义任务清单
gulp.task( 'less', function () {
    // 需要编译的less的路径
    gulp.src( './public/less/*.less' )
        // 通过管道 编译
        .pipe( less() )
        // 通过管道设置编译完成的路径
        .pipe( gulp.dest( './public/css' ) );
})