// 旧版gulp使用
var gulp = require('gulp')
var sass = require('gulp-sass')
var del = require('del') // 清空文件
var useref = require('gulp-useref')
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache'); // 只压缩修改的图片，没有修改的图片从缓存读取
var runSequence = require('run-sequence');

// 基础任务
gulp.task('hello', function () {
  console.log('gulp任务开始')
})

// 处理样式：把scss转成css
gulp.task('sass', function () {
  /**
   * 创建一个流，从文件系统读取对象
   * 这里获取app/scss下以及其子文件下所有以.scss结尾的文件
   * src(globs, [options])
   */
  return gulp.src('app/scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('app/css')) // 将生成的对象写入文件系统流，dest(directory, [options])
  // 流（stream）所提供的主要的 API 是 .pipe() 方法，用于连接转换流（Transform streams）或可写流（Writable streams）。
})

// 监听 globs 并在发生更改时运行任务
// watch(globs, [options], [task]),
// gulp.task('watch', function () {
//   gulp.watch('app/scss/**/*.scss', ['sass']) // 变动时，触发sass任务
//   gulp.watch('app/index.html', function () {
//     console.log('index改动了')
//   })
// })
gulp.task('clean:dist', function () {
  console.log('清空dist文件')
  return del(['dist/**/*'])
})
// 合并资源:通过html中的注释 build:<type>(alternate search path) <path> <parameters>
// 把所有css合并一起，js合并一起，减小资源请求次数
gulp.task('useref', function () {
  console.log('压缩资源')
  return gulp.src('app/*.html')
  .pipe(useref())
  .pipe(gulp.dest('dist'))
})
// 合并图片
gulp.task('images', function () {
  console.log('合并图片')
  return gulp.src('app/images/**/*.+(jpg|png)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'))
})

// 串行执行任务，并发任务可以任意嵌套在串行任务中
gulp.task('build', gulp.series(
  'clean:dist',
  'sass',
  gulp.parallel('images', 'useref')
  ),
  function () {
    console.log('结束')
  }
)
