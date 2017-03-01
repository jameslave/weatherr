const gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin')

const paths = {
	sass: 'src/sass/*',
	img: 'src/img/**/*'
}

gulp.task('sass', () => {
	gulp.src(paths.sass)
		.pipe(sass({includePaths: ['node_modules/normalize-scss/sass']})
		.on('error', sass.logError))
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(cleancss({level: 2}))
		.pipe(gulp.dest('dist'))
})

gulp.task('img', () => {
	gulp.src(paths.img)
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
})

gulp.task('watch', () => {
	gulp.watch(paths.sass, ['sass'])
	gulp.watch(paths.img, ['img'])
})

gulp.task('default', ['sass', 'img', 'watch'])