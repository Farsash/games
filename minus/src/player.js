function Player( lvl, dr_setting ){
    
    this.hp = 9;
    this.face = 'p';
    this.data = dr_setting;
    this.defoultPos = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
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

    this.collision = function (){
        
        if( lvl[this.pos.x][this.pos.y].type === 'num' ){
            this.hp -= lvl[this.pos.x][this.pos.y].txt;
        }

        this.hpInfo();

    }

    this.hpInfo = function(){

        if (this.hp < 0 || this.hp === 0){
            //alert('Конец игры');
        }

    }

}

export default Player;