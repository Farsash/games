function Player(){
    
    this.hp = 9;
    this.savePosition;
    this.st_pos = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };

    this.data = function(){

        return { type: 'player', bg: '#00ff00', txt_bg: '#ff0000', txt: this.hp }

    }


    this.move = function( e ){

        if (e == 39) {
            this.pos.x += 1;
        } else if (e == 37) {
            this.pos.x -= 1;
        } else if (e == 40) {
            this.pos.y += 1;
        } else if (e == 38) {
            this.pos.y -= 1;
        }

    }

}

export default Player;