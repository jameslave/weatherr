const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	babel = require('gulp-babel'),
	browserify = require('gulp-browserify'),
	cleancss = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify')

const paths = {
	js: 'src/js/*',
	sass: 'src/sass/*',
	img: 'src/img/**/*',
	npm: [
		'node_modules/normalize-scss/sass'
	]
}

gulp.task('js', () => {
	gulp.src('src/js/main.js')
		.pipe(sourcemaps.init())
		.pipe(browserify())
		.pipe(babel({presets: ['es2015']}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
})

gulp.task('sass', () => {
	gulp.src(paths.sass)
		// .pipe(sourcemaps.init())
		.pipe(sass({includePaths: paths.npm}))
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(cleancss({level: 2}))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
})

gulp.task('img', () => {
	gulp.src(paths.img)
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
})

gulp.task('watch', () => {
	gulp.watch(paths.js, ['js'])
	gulp.watch(paths.sass, ['sass'])
	gulp.watch(paths.img, ['img'])
})

gulp.task('default', ['js', 'sass', 'img', 'watch'])