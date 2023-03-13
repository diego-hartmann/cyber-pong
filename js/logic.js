const canvas = document.getElementById('game');
const canvasCtx = canvas?.getContext('2d');


const field = {
    // functions for dynamic size based on resize
    getWidth:  () => window.innerWidth,
    getHeight: () => window.innerHeight,
    draw(){
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect( 0, 0, this.getWidth(), this.getHeight());
    }
}

const line = {
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

const racket1 = {
    w:15,
    h:200,
    draw(){
        // racket
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect( 10, 400, this.w, this.h );
    }
}

const player1 = {
    racket:{
        w:15,
        h:200,
        y: 200,
        draw(){
            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.fillRect( 10, this.y, this.w, this.h );
        }
    },
    score:{
        value: 0,
        draw(){
            canvasCtx.font = "bold 72px Arial";
            canvasCtx.textAlign = "center";
            canvasCtx.textBaseline = "top";
            canvasCtx.fillStyle = "#01341D";
            canvasCtx.fillText(this.value.toString(), field.getWidth()/4, 50)
        }
    },
    draw(){
        this.racket.draw();
        this.score.draw();
    } 

}
const player2 = {
    racket:{
        w:15,
        h:200,
        y: 200,
        draw(){
            canvasCtx.fillStyle = "#ffffff";
            canvasCtx.fillRect( field.getWidth() - 15 - 10, this.y, this.w, this.h );
        }
    },
    score: {
        value: 0,
        draw(){
            canvasCtx.font = "bold 72px Arial";
            canvasCtx.textAlign = "center";
            canvasCtx.textBaseline = "top";
            canvasCtx.fillStyle = "#01341D";
            canvasCtx.fillText(this.value.toString(), field.getWidth()/4 + field.getWidth()/2, 50)
        }
    },
    draw(){
        this.racket.draw();
        this.score.draw();
    }
}

const ball = {
    x: 300,
    y: 200,
    r: 20,
    speed: 5,
    draw(){
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, (Math.PI*2), false);
        canvasCtx.fill();
        this.move(1,0);
    },
    move(x, y){
        this.x += x * this.speed;
        this.y += y * this.speed;
    }
}

const game = {
    draw(){
        this.setup();
        field.draw();
        line.draw();
        player1.draw();
        player2.draw();
        ball.draw();
    },
    setup(){
        canvas.width = canvasCtx.width = field.getWidth();
        canvas.height = canvasCtx.height = field.getHeight();
    }
}

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



game.setup(); // first setup

(function main(){ // creating and calling the init function
    animateFrame(main); // loop the init function (recursive)
    game.draw(); // draw each frame
})()