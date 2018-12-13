import { drawSetting, levels } from "./lvl";
import Game from "./game.js"; 
import DrawSetting from "./other.js"; 
import Html from "./content/html.js"; 

var drw_setting = new DrawSetting( drawSetting );
    drw_setting.update();

var game = new Game( levels, drw_setting );

var html = new Html();

Start();

function Start(){
    html.update('start');
}




window.uclicked = function() {
    document.addEventListener("keydown", Move, false);   
    html.clear();
    game.start();
}






function Move(e){
    game.move(e.keyCode);
}

