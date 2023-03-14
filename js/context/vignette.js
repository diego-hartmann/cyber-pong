const alpha = 0.7;
import { field } from "./field.js";
import { canvasCtx } from "./canvas.js";

export const vignette = {
	draw() {
		const w = field.getWidth();
		const h = field.getHeight();
		
		canvasCtx.rect(0, 0, w, h);
		
		// create radial gradient
		const outerRadius = w * .5;
		const innerRadius = w * .2;
		
		const grd = canvasCtx.createRadialGradient(w / 2, h / 2, innerRadius, w / 2, h / 2, outerRadius);
		
		// light blue
		grd.addColorStop(0, 'rgba(0, 0, 0, 0)');
		// dark blue
		grd.addColorStop(1, 'rgba(0, 0, 0,' + alpha + ')');

		canvasCtx.fillStyle = grd;
		canvasCtx.fill();
	}
};