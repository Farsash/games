import array from "lodash/array";
import { drawSetting, levels } from "./lvl";
import Game from "./game.js"; 
import DrawSetting from "./other.js"; 
import Player from "./player"; 
import Engine from "./engine"; 

var drw_setting = new DrawSetting( drawSetting );
    drw_setting.update();

var game = new Game( levels, drw_setting );
    game.start();

var player;
    player = new Player( game.lvl, drw_setting );
    player.update();
    game.update();

//var engine = new Engine( player, game );    

var eventsTrigget = {
    restart: function(){
        console.log('dssd');
        game.restart();
        player = new Player( game.lvl, drw_setting );
    },
    'lvlUp': function(){
        game.restart();
        player = new Player( game.lvl, drw_setting );
    },
    'false': 1
}

 
document.addEventListener("keydown", Move, false);

function Move(e) {

    var savePosition = { x: player.pos.x, y: player.pos.y };

    player.clear();

    if (e.keyCode == 39) {
        player.pos.x += 1;
    } else if (e.keyCode == 37) {
        player.pos.x -= 1;
    } else if (e.keyCode == 40) {
        player.pos.y += 1;
    } else if (e.keyCode == 38) {
        player.pos.y -= 1;
    }

    var wall = player.wall();
    if (wall === true) {
       player.pos = savePosition;
    } else {

    }
 
    var collision = player.collision(); 
    
    if ( player.lvl[player.pos.x][player.pos.y].type === 'fin' ){
        game.LvlUp();
        player = new Player( game.lvl, drw_setting );
    } else if( player.hp === 0 || player.hp < 0 ){
        game.restart();
        player = new Player( game.lvl, drw_setting );
    }

 
     
    //console.log(game.lvl2);

    player.update();
    game.update();
}
