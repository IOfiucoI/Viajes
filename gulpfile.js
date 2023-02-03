const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ) {
    src('scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('css') )

    done();
}

function imagenes() {
    return src('img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('img') )
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('img/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('img') )
}
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('img/**/*.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest('img'))
}

function dev() {
    watch( 'scss/**/*.scss', css );
    watch( 'img/**/*', imagenes );
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( imagenes, versionWebp, versionAvif, css, dev  );
