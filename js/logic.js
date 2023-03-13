const canvas = document.getElementById('game');
const canvasCtx = canvas?.getContext('2d');

const mouse = {
    x: 0,
    y: 0
}

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
            this._move();
        },
        _move(){
            this.y = mouse.y - this.h / 2;
        }
    },
    score:{
        value: 0,
        increment(){
            this.value = this.value + 1;
        },
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
            this._move();
        },
        _move(){
            this.y = ball.y - this.h / 2;
        }
    },
    score: {
        value: 0,
        increment(){
            this.value = this.value + 1;
        },
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
    x: 100,
    y: 200,
    r: 20,
    speed: 5,
    dirX: 1,
    dirY : 1,
    gapX : 15,
    _reverseY(){
        this.dirY *= -1;
    },
    _reverseX(){
        this.dirX *= -1.
    },
    _recenter(){
        this.x = field.getWidth() / 2;
        this.y = field.getHeight() / 2;
    },
    _calcPostion(){

        // ball hits PC field?
        if(this.x > (field.getWidth() - this.r - player2.racket.w - this.gapX)){
            
            if( // PC hits ball?
                ((this.y + this.r) > player2.racket.y) && 
                ((this.y - this.r) < (player2.racket.y + player2.racket.h))
            ){
                this._reverseX();
            }else{ // PC misses ball?
                player1.score.increment();
                this._recenter();
            }
        }



        // ball hits player field?
        if(this.x < this.r + player1.racket.w + this.gapX){
            if( // player hits ball?
                this.y + this.r > player1.racket.y &&
                this.y - this.r < player1.racket.y + player1.racket.h
            ){
                this._reverseX();
            }else{ // player misses ball?
                player2.score.increment();
                this._recenter();
            }
        }
        
        

        // invert Y if hits floor or roof
        const onTop = this.y > field.getHeight() - this.r;
        const onBottom = this.y < 0 + this.r; 
        if( onTop || onBottom )
            return this._reverseY();

       
    },
    _move(){
        this.x += this.speed * this.dirX;
        this.y += this.speed * this.dirY;
    },
    draw(){
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, (Math.PI*2), false);
        canvasCtx.fill();

        this._calcPostion();
        this._move();
    },
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
    animateFrame(main); // loop this init function (recursive) through the api
    game.draw(); // draw each frame
})()

// update mouse object position to update player1 position
canvas.addEventListener('mousemove', (e)=>{
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})