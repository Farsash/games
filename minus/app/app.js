var game = new Game('canvas', 0.6);
var lvl = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', '1', ' ', '8', ' ', ' '],
    [' ', ' ', '3', '4', '4', '1', '5', ' ', ' ', ' '],
    [' ', ' ', '8', '1', '3', '8', '5', ' ', ' ', ' '],
    [' ', '1', '2', '9', 'x', '5', '4', ' ', '8', ' '],
    [' ', ' ', '3', '3', '1', '8', '3', ' ', ' ', ' '],
    [' ', ' ', '5', '5', '9', '7', '9', ' ', ' ', ' '],
    [' ', ' ', '8', '4', '4', '8', '9', ' ', ' ', ' '],
    ['1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
];

var _lvl = game.creaveLvl(lvl);

var player = new Player();
player.update(lvl);
game.render(lvl);

document.addEventListener("keydown", Move, false);

function Move(e) {

    var savePosition = {
        x: player.pos.x,
        y: player.pos.y
    };
    player.clear(lvl);

    if (e.keyCode == 39) {
        player.pos.x += 1;
    } else if (e.keyCode == 37) {
        player.pos.x -= 1;
    } else if (e.keyCode == 40) {
        player.pos.y += 1;
    } else if (e.keyCode == 38) {
        player.pos.y -= 1;
    }

    var wall = player.wall(lvl);

    if (wall === true) {
        player.pos = savePosition;
    } else {

    }

    var collision = player.collision(lvl);

    var end = player.hpInfo();

    player.update(lvl);
    game.render(lvl);
}