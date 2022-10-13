// ###########################################
// IMPORTACIÓN DE FUNCIONES 
// ###########################################

const {src, dest, watch, series } = require('gulp');

// IMPORTACIONES DE CSS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// IMPORTACIONES PARA IMAGENES
const imagesmin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// ###########################################
// TAREAS DE GULP
// ###########################################

const compile = ( done ) => {

  src('./src/sass/main.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass({ outputStyle: 'expanded'}) )
    .pipe( postcss([autoprefixer(), cssnano() ]))
    .pipe( sourcemaps.write('.') )
    .pipe( dest('./build/css') );

  done();
};

const attention =  () => {
  watch('./src/sass/**/*.scss', compile);
}

const images = () => {
  return src('./src/img/**/*')
    .pipe( imagesmin({optimizationLevel: 3}) )
    .pipe( dest('./build/img'));
}

const imagesWebp = () => {
  return src('./src/img/**/*.{png,jpg}')
    .pipe( webp({quality: 50}) )
    .pipe( dest('./build/img') );
}

const imagesAvif = () => {
  return src('./src/img/**/*.{png,jpg}')
    .pipe( avif({quality: 50}) )
    .pipe( dest('./build/img') );
}

// ###########################################
// EXPORTAR TAREAS GULP
// ###########################################

exports.compile = compile;
exports.attention = attention;
exports.images = images;
exports.imagesWebp = imagesWebp;
exports.imagesAvif = imagesAvif;

exports.default = series( compile, attention );
