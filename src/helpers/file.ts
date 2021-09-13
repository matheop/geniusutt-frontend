export const getFileExtension = (path: string) => {
	return path
		? path.slice(((path.lastIndexOf(".") - 1) >>> 0) + 2)
		: undefined;
};

export const getImageMimeType = (path: string) => {
	let extension = getFileExtension(path);
	if (extension === "jpg") {
		extension = "jpeg";
	}
	return extension ? "image/" + extension : undefined;
};
