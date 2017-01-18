/**
 * gulp实现下面功能
 * 用到的gulp插件
 * 	1). gulp-less		less编译
 * 	2). gulp-concat		文件合并
 * 	3). gulp-uglify	
 * 	4). gulp-cssnano 	css文件压缩
 * 	5). gulp-htmlmin
 * 
 * 1. less文件的编译，压缩，合并
 * 2. js合并，压缩，混淆
 * 3. img复制
 * 4. html压缩
 * 
 */


var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');


/** 任务1 */
gulp.task('style', function () {
	/** src支持数字参数，在路径前面加上!表示不匹配该文件 */
	gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({
			stream: true
		}));

});


/** 任务2 */
gulp.task('script', function () {
	/** 先合并 在混淆 */
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({
			stream: true
		}));
})


/** 任务3 */
gulp.task('image', function () {
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream: true
		}));
})



/** 任务4 */
gulp.task('html', function () {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			/* 去除空白字符 */
			collapseWhitespace: true,
			/* 去除注释 */
			removeComments: true,
			/* 去除引号 因为没有引号浏览器也能识别属性值，这样可以节省空间*/
			removeAttributeQuotes: true
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({
			stream: true
		}));
})


var browserSync = require('browser-sync');
gulp.task('serve', function () {
	browserSync({
		server: {
			baseDir: ['dist/'],
		},
		port: 2017
	}, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/styles/*.less', ['style']);
	gulp.watch('src/scripts/*.js', ['script']);
	gulp.watch('src/images/*.*', ['image']);
	gulp.watch('src/*.html', ['html']);
})