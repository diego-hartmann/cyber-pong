import { field } from "../context/field.js";
import { canvasCtx } from "../context/canvas.js";

export const line = {
    w: 3,
    draw(){
        canvasCtx.fillStyle = "#cccccc20";
        canvasCtx.fillRect( 
            (field.getWidth()/2) - (this.w/2),
            0,
            this.w,
            field.getHeight()
        );
    }
}