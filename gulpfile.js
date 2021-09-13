import gulp from "gulp";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import webp from "imagemin-webp";
import format from "gulp-image-resize";

const sizes = [
	{ width: 1080, quality: 85, suffix: "hd" },
	{ width: 720, quality: 90, suffix: "md" },
	{ width: 320, quality: 95, suffix: "ld" },
];

const actions = [
	{
		ext: "webp",
		input: "static/pictures/origin/*.{jpg,jpeg,png}",
		fn: (size) =>
			imagemin([
				webp({
					quality: size.quality,
					resize: {
						width: size.width,
						height: 0,
					},
				}),
			]),
	},
	{
		ext: "jpg",
		input: "static/pictures/origin/*.{jpg,jpeg}",
		fn: (size) =>
			format({
				quality: size.quality / 120,
				width: size.width,
				format: "jpg",
			}),
	},
	{
		ext: "png",
		input: "static/pictures/origin/*.png",
		fn: (size) =>
			format({
				quality: size.quality / 120,
				width: size.width,
			}),
	},
];

gulp.task("images", async () => {
	return sizes.forEach(async (size) => {
		actions.forEach(async (act) => {
			gulp.src(act.input)
				.pipe(act.fn(size))
				.pipe(
					rename({ extname: `-${size.suffix}.${act.ext}` })
				)
				.pipe(gulp.dest("static/pictures/min"));
		});
	});
});
