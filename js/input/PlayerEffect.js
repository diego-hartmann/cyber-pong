export function PlayerEffect(onActivate, onDisactivate) {
    window.addEventListener('keydown', event => {
        switch(event.code){
            case 'Space': onActivate();
            break;
            default:
                break;
            }
        });
        
        window.addEventListener('keyup', event => {
            switch(event.code){
            case 'Space': onDisactivate();
                break;
                default:
                    break;
        }
    });
}