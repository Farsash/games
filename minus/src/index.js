import { drawSetting, levels } from "./lvl";
import Game from "./game.js"; 
import DrawSetting from "./other.js"; 
import Player from "./player"; 

var drw_setting = new DrawSetting( drawSetting );
    drw_setting.update();

var game = new Game( levels, drw_setting );
    game.start();

var player = new Player( game.lvl, drw_setting );
    player.update();
    game.update();



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
    player.collision();
    player.update();
    game.update();


}
