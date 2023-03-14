import { game } from "./context/game.js";

// smooth frame change
window.animateFrame = (()=>{
    return(
        // native
        window.requestAnimationFrame ||
        // google
        window.webkitRequestAnimationFrame || 
        // mozilla
        window.mozRequestAnimationFrame || 
        // opera
        window.oRequestAnimationFrame || 
        // microsoft
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
    )
})();


(function main(){ // creating and calling the init function
    animateFrame(main); // loop this init function (recursive) through the api
    game.draw(); // draw each frame
})()
