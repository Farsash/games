function Engine( player, game ){

    this.player = player;
    this.game = game;

    this.update = function(){
        console.log(this.player.pos);
        if (this.player.hp === 0 || this.player.hp < 0 ){
            this.player.pos = { x: 0, y: 0 };
            this.player.update();
            this.game.restart();
        }
    }

}

export default Engine;