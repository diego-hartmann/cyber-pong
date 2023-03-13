import { canvas, canvasCtx } from "./canvas.js";
import { field } from "./field.js";
import { line } from "../gameObjects/line.js";
import { player1, player2 } from "../gameObjects/player.js";
import { ball } from "../gameObjects/ball.js";

export const game = {
    draw(){
        this._setup();
        field.draw();
        line.draw();
        player1.draw();
        player2.draw();
        ball.draw();
    },
    _setup(){
        canvas.width = canvasCtx.width = field.getWidth();
        canvas.height = canvasCtx.height = field.getHeight();
    }
}