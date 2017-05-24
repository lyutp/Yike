
var gulp = require( 'gulp' ),

    less = require( 'gulp-less' ),

    cssmin = require( 'gulp-cssmin' ),

    autoprefixer = require( 'gulp-autoprefixer' ),

    rev = require( 'gulp-rev' ),

    revCollector = require( 'gulp-rev-collector' ),

    rename = require( 'gulp-rename' ),

    imagemin = require( 'gulp-imagemin' ),

    useref = require( 'gulp-useref' ),

    gulpif = require( 'gulp-if' ),

    uglify = require( 'gulp-uglify' ),

    htmlmin = require( 'gulp-htmlmin' );

// css 编译
gulp.task( 'less', function () {
    return gulp.src( './public/less/*.less' )
        // 将less编译为css
        .pipe( less() )
        // 压缩css
        .pipe( cssmin() )
        // 并添加css私有化前缀
        .pipe( autoprefixer() )
        // 给css文件生成版本号
        .pipe( rev() )
        // 将css存入指定 文件目录
        .pipe( gulp.dest( './release/public/css' ) )
        // 生成 css原本名称 与 生成版本后的名称 对应关系的json 文件
        .pipe( rev.manifest() )
        // 将 该json文件改名 css-
        .pipe( rename( 'css-manifest.json' ) )
        // 将该json文件单独存储
        .pipe( gulp.dest( './release/rev' ) );
});

// images 压缩
gulp.task( 'image', function () {
    return gulp.src( [ './uploads/*', './public/images/**/*'], { base : './' } )
        // 压缩图片
        .pipe( imagemin() )
        // 给image 生成版本号
        .pipe( rev() )
        // 存入指定路径
        .pipe( gulp.dest( './release' ) )
        // 生成 image原本名称 与 生成版本后的名称 对应关系的json 文件
        .pipe( rev.manifest() )
        // 将 该json文件改名 image-
        .pipe( rename( 'image-manifest.json' ) )
        // 将该json文件单独存储
        .pipe( gulp.dest( './release/rev' ) )
});

// html中引入的js 进行合并和压缩
gulp.task( 'useref',function () {
    return gulp.src( './index.html' )
        // 将html中指定的js合并 或者删除
        .pipe( useref() )
        // 将js压缩(判断如果是js文件，压缩)
        .pipe( gulpif( '*.js', uglify() ) )
        // 给js生成版本号(判断如果是js文件，才执行)
        .pipe( gulpif( '*.js', rev() ) )
        // 如果是html，那么压缩
        .pipe( gulpif( 'index.html', htmlmin({collapseWhitespace: true, removeComments: true}) ) )
        // 存储
        .pipe( gulp.dest( './release' ) )
        // 生成 js原本名称 与 生成版本后的名称 对应关系的json 文件
        .pipe( rev.manifest() )
        // 将 该json文件改名 js-
        .pipe( rename( 'js-manifest.json' ) )
        // 将该json文件单独存储
        .pipe( gulp.dest( './release/rev' ) )
});

// 处理其他不需要特别处理的资源( api,scripts,libs,fonts,icon )
gulp.task( 'other', function () {
    return gulp.src( [ './api/*', './scripts/*', './public/libs/*', './public/fonts/*','./favicon.ico' ],{ base : './' } )
        .pipe( gulp.dest( './release' ) );
});

// // html 压缩
// gulp.task( 'html', [ 'useref' ], function () {
//     return gulp.src( ['./release/index.html', './views/*.html'] ,{ base : './'} )
//         // 去除空白字符， 删除注释, 压缩js
//         // htmlmin( {collapseWhitespace: true, removeComments: true, minifyJS: true} )
//         .pipe( htmlmin( {collapseWhitespace: true} ) )
//         .pipe( gulp.dest( './release' ) );
// });

// html 压缩
gulp.task( 'html', [ 'useref' ], function () {
    return gulp.src( './views/*.html' ,{ base : './'} )
        // 去除空白字符， 删除注释, 压缩js
        // htmlmin( {collapseWhitespace: true, removeComments: true, minifyJS: true} )
        .pipe( htmlmin( {collapseWhitespace: true, removeComments: true} ) )
        .pipe( gulp.dest( './release' ) );
});

// 替换文件引入的名称
gulp.task( 'rev', [ 'less', 'image', 'useref'], function () {
     return gulp.src( [ './release/rev/*.json', './release/index.html' ] )
        // 根据版本号对应的 json文件，替换引入的名字
        .pipe( revCollector() )
        .pipe( gulp.dest( './release' ) );
});

// 设置默认(一步操作全部处理)
gulp.task( 'default', [ 'rev', 'other', 'html' ] );