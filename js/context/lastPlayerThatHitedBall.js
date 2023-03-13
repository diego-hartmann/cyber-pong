export const lastPlayerThatHitedBall = {
    _player : {},
    get(){
        return this._player;
    },
    set(player){
        this._player=player;
    }
}