import { drawSetting, levels } from "./lvl";
import Game from "./game.js"; 
import DrawSetting from "./other.js"; 
import Html from "./content/html.js"; 

var drw_setting = new DrawSetting( drawSetting );
    drw_setting.update();

var game = new Game( levels, drw_setting );

Start();

function Start(){
    game.html.update('start');
}




window.run = function() {
    document.addEventListener("keydown", Move, false);   
    game.html.clear();
    game.start();
};

window.next = function() { 
   
};






function Move(e){
    game.move(e.keyCode);
}

