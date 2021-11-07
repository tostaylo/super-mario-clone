export async function loadImage(url) {
	return new Promise((resolve) => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image);
		});
		image.src = url;
	});
}

export async function loadLevel(name) {
	const level = await fetch(`levels/${name}.json`);
	return level.json();
}
