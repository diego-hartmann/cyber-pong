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

const player1 = {
    w:15,
    h:200,
    draw(){
        // racket
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect( 10, 400, this.w, this.h );
            // score
        canvasCtx.font = "bold 72px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#01341D";
        canvasCtx.fillText('3', field.getWidth()/4, 50)
    } 
}

const player2 = {
    w:15,
    h:200,
    draw(){
        // racket
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillRect(
            field.getWidth() - 15 - 10, 200, this.w, this.h );
        // score
        canvasCtx.font = "bold 72px Arial";
        canvasCtx.textAlign = "center";
        canvasCtx.textBaseline = "top";
        canvasCtx.fillStyle = "#01341D";
        canvasCtx.fillText('1', field.getWidth()/4 + field.getWidth()/2, 50)
    }
}

const ball = {
    draw(){
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(200, 300, 20, 0, (2*Math.PI), false);
        canvasCtx.fill();
    }
}

const game = {
    draw(){
        this.checkSize();
        field.draw();
        line.draw();
        player1.draw();
        player2.draw();
        ball.draw();
    },
    checkSize(){
        canvas.width = canvasCtx.width = field.getWidth();
        canvas.height = canvasCtx.height = field.getHeight();
    }
}

game.draw();
// when the user resizes the window,
window.onresize = () => {
    // the canvas must rerender the context
    game.draw();
}