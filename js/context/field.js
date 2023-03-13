import { canvasCtx } from "./canvas.js";

export const field = {
    // functions for dynamic size based on resize
    getWidth:  () => window.innerWidth,
    getHeight: () => window.innerHeight,
    draw(){
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect( 0, 0, this.getWidth(), this.getHeight());
    }
}