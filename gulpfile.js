var gulp = require("gulp");

var less = require("gulp-less");
var lessCom = require("gulp-clean-css");

var rename = require("gulp-rename");

var ES6 = require("gulp-babel");
var ES6Com = require("gulp-uglify");


// less编译
gulp.task("css", () => {
    gulp.src("./src/less/*.less")
        .pipe(less())
        .pipe(gulp.dest("./src/css"))
    console.log("-----css--->>>----less------");
})

// less编译加压缩
gulp.task("cssCom", () => {
    gulp.src("./src/index/less/*.less")
        .pipe(less())
        .pipe(lessCom())
        .pipe(rename("index.css"))
        .pipe(gulp.dest("./src/index/less"))
    console.log("-----css---->>>----less---->>>----压缩---");
})

// less编译
gulp.task("js", () => {
    gulp.src("./src/*/js/*.js")
        .pipe(ES6())
        .pipe(rename("main.js"))
        .pipe(gulp.dest("./dist/js"))
    console.log("-----ES6--->>>----ES5------");
})

// less编译加压缩
gulp.task("jsCom", () => {
    gulp.src("./src/*/js/*.js")
        .pipe(ES6())
        .pipe(ES6Com())
        .pipe(rename("main.js"))
        .pipe(gulp.dest("./dist/js"))
    console.log("-----ES6---->>>----ES5---->>>----压缩---");
})

gulp.task("watch", ["css"], () => {
    gulp.watch(["./src/search/less/*.less"], ["css"])
})