function entityMouseDebugger(canvas, entity, camera) {
	['mousedown', 'mousemove'].forEach((eventName) => {
		canvas.addEventListener(eventName, (event) => {
			if (event.buttons === 1) {
				entity.vel.set(0, 0);
				entity.position.set(
					event.offsetX + camera.position.x,
					event.offsetY + camera.position.y
				);
				camera.position.x += 20;
			}
		});
	});
}

export { entityMouseDebugger };
