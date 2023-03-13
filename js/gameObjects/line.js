import { field } from "../context/field.js";
import { canvasCtx } from "../context/canvas.js";

export const line = {
    w: 15,
    h: field.getHeight(),
    draw(){
        canvasCtx.fillStyle = "#ccc";
        canvasCtx.fillRect( 
            (field.getWidth()/2) - (this.w/2),
            0,
            15,
            this.h
        );
    }
}