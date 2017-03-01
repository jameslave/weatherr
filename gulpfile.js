const gulp = require('gulp'),
			sass = require('gulp-sass'),
			concat = require('gulp-concat'),
			autoprefixer = require('gulp-autoprefixer')

const sassDir = 'src/sass/*.scss'

gulp.task('sass', () => {
	gulp.src(sassDir)
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: [
				'node_modules/normalize-scss/sass'
			]
		})
		.on('error', sass.logError))
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
		}))
		.pipe(gulp.dest('build/css'));
})

gulp.task('fonts', () => {
	gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('build/fonts'))
})

gulp.task('watch', () => {
	gulp.watch(sassDir, ['sass'])
})