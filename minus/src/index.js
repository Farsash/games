import { drawSetting, levels } from "./lvl";
import Game from "./game.js"; 
import DrawSetting from "./other.js"; 
import Player from "./player"; 

var drw_setting = new DrawSetting( drawSetting );
drw_setting.update();

var game = new Game( levels, drw_setting );
game.start();
game.update();

console.log(Player);

game.lvl[0][1] = {type: "player", bg: "blue"};
game.update();
console.log(game.lvl);