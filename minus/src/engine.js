function Game(id, size, width, height) {

    // Canvas 
    this.c = document.getElementById(id);
    this.ctx = this.c.getContext("2d");

    this.s_height = height || window.innerHeight * size;
    this.s_width = width || window.innerHeight * size;
    this.c.setAttribute('width', this.s_width);
    this.c.setAttribute('height', this.s_height);

    // Draw
    this.padding = 0.8;
    this.sizeB = 30;
    this.mark = {
        ' ': '#97cef6',
        '_': '#458dc2',
        'x': '#70bc77'
    };

    this.lvlOriginal = [[' ']];
    this.lvl = [[' ']]; 
    this.startLvl = function( map ){
        this.lvlOriginal = map.slice();
        this.lvl = map;
    }

    this.restartLvl = function(){
        this.lvl = this.lvlOriginal;
        console.log('restart', this.lvlOriginal);
    }

    this.creaveLvl = function (map) {
        var data = {
            type: 'player'
        }
        var lvl = [];

        for (var i = 0; i < map.length; i++) {
            for (var g = 0; g < map[i].length; g++) {

            }
        }

    }

    this.drawEl = function (x, y, mtl, txt, player) {
        this.ctx.beginPath();
        
        if(player === true ){
            console.log('player');
            this.ctx.fillStyle = 'red';
        } else {
            this.ctx.fillStyle = mtl.bgColor;
        }
        
        var sizeGrid = this.s_width / this.lemMap;
        this.ctx.fillRect(y * sizeGrid + (this.padding * 4.5), x * sizeGrid + (this.padding * 4.5), sizeGrid * this.padding, sizeGrid * this.padding);

        if (txt != false) {

            this.ctx.font = sizeGrid / 1.5 + 'px ' + "Arial";
            this.ctx.fillStyle = '#2b2b2b';
            var xt = y * sizeGrid + this.lemMap;
            var yt = x * sizeGrid + this.lemMap;
            this.ctx.fillText(txt.t, xt, yt + (sizeGrid / 2));

        }

    }

    this.render = function (map) {
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        this.lemMap = map[0].length;
        for (var i = 0; i < map.length; i++) {
            for (var g = 0; g < map[i].length; g++) {

                var mtl = {}
                var txt = {};

                if (map[i][g] === ' ' || map[i][g] === '_' || map[i][g] === 'x') {
                    mtl.bgColor = this.mark[map[i][g]];
                    txt = false;
                } else {
                    mtl.bgColor = '#eaf2f2';
                    txt.t = map[i][g];
                }

                if(isNaN(map[i][g])){
                    console.log('Игрок');
                }

                this.drawEl(i, g, mtl, txt);
            }
        }
    }

}

function Player() {
    this.hp = 2;
    this.face = '#';
    this.pos = {
        x: 0,
        y: 0
    }
    this.update = function (map) {
        console.log(map);
        map[this.pos.y][this.pos.x] = this.hp;
    }

    this.clear = function (map) {
        //console.log(map[this.pos.x][this.pos.y]);
        map[this.pos.y][this.pos.x] = ' '
    }

    this.wall = function (map) {
        var x = this.pos.x;
        var y = this.pos.y;
        console.log(x);
        if (x === -1 || x === map[0].length || y === -1 || y === map.length) {
            console.log('wall');
            return true;
        }
    }

    this.hpInfo = function () {
        if (this.hp < 0 || this.hp === 0) {
            alert('Конец игры');
            return true;
        } else {
            return false;
        }
    }

    this.collision = function (map) {
        var x = this.pos.x;
        var y = this.pos.y;
        if (map[y][x] != ' ' && map[y][x] != '_' && map[y][x] != 'x') {
            console.log(map[x][y]);
            this.hp -= map[y][x];
            //return true;
        } else if (map[y][x] === 'x') {
            alert('Конец игры');
            //return false
            //map[x][y] = '_'
        }
    }
}

export {Game, Player };