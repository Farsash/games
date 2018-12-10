function Player( lvl, dr_setting ){
    
    this.hp = 9;
    this.face = 'p';
    this.data = dr_setting;
    this.defoultPos = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
    this.lvl = lvl;


    this.update = function(){
        //console.log(this.d_lvl);
        var x = this.pos.x;
        var y = this.pos.y;
        var el = this.data.setting[this.face];
        el.txt = this.hp;
        this.lvl[y][x] = el;

    }

    this.clear = function(){

        var x = this.pos.x;
        var y = this.pos.y;
        this.lvl[y][x] = this.data.setting[' '];

    }

    this.wall = function () {
        var x = this.pos.x;
        var y = this.pos.y;
        if (x === -1 || x === lvl[0].length || y === -1 || y === lvl.length) {
            console.log('wall');
            return true;
        }
    }

    this.collision = function (){
        
        if( lvl[this.pos.y][this.pos.x].type === 'num' ){
           this.hp -= lvl[this.pos.y][this.pos.x].txt;
        }
    }

}

export default Player;