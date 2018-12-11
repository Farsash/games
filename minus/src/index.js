import { drawSetting, levels } from "./lvl";
import Game from "./game.js"; 
import DrawSetting from "./other.js"; 

var drw_setting = new DrawSetting( drawSetting );
    drw_setting.update();

var game = new Game( levels, drw_setting );
    game.start();


document.addEventListener("keydown", Move, false);   

function Move(e){
    game.move(e.keyCode);
}

