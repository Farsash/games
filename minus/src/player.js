function Player( lvl, dr_setting ){
    
    this.hp = 9;
    this.face = 'p';
    this.data = dr_setting;
    this.pos = { x: 1, y: 0 }
    this.lvl = lvl;
    this.update = function(){

        var x = this.pos.x;
        var y = this.pos.y;
        var el = this.data.setting[this.face];
        el.txt = this.hp;
        this.lvl[x][y] = el;

    }

    this.clear = function(){

        var x = this.pos.x;
        var y = this.pos.y;
        this.lvl[x][y] = this.data.setting[' '];

    }

    this.wall = function () {
        var x = this.pos.x;
        var y = this.pos.y;
        if (x === -1 || x === lvl[0].length || y === -1 || y === lvl.length) {
            console.log('wall');
            return true;
        }
    }

}

export default Player;