import { mouse } from "./mouse.js";

export const canvas = document.getElementById('game');
export const canvasCtx = canvas?.getContext('2d');

// update mouse object position to update player1 position
canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})