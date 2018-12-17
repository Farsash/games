import RenderCanvas from "./render.js";
import Player from "./player.js";
import Html from "./content/html.js";

function Game( maps, setting ){

    this.level = 0;
    this.maps = maps;
    this.html = new Html();
    this.lvl;
    this.setting = setting;
    this.render = new RenderCanvas();
    this.player = new Player();

    this.start = function(){
        this.createLvl();
        /*
        console.log(this.lvl);
        console.log(this.lvl[3][4]);
        */
        this.player.pos.x = 0;
        this.player.pos.y = 0;
        this.player.hp = 9;
        let el = this.setting.setting['p'];
        el.txt = this.player.hp;
        this.lvl[this.player.pos.y][this.player.pos.x] = el;

        this.render.update( this.lvl );
    };

    this.move = function( e ){

        console.log('move');

        let savePosition = { x: this.player.pos.x, y: this.player.pos.y};

        this.clear( savePosition );

        this.player.move(e);
        
        var wall = this.wall();

        if( wall === true ){
            this.player.pos = savePosition;
            console.log('wall');
        } 

        if( this.lvl[this.player.pos.y][this.player.pos.x].type === 'num' ){
            this.player.hp -= this.lvl[this.player.pos.y][this.player.pos.x].txt;
            savePosition.num = this.lvl[this.player.pos.y][this.player.pos.x].txt;
        } else if ( this.lvl[this.player.pos.y][this.player.pos.x].type === 'fin' ){
            this.LvlUp();
        }

        this.lvl[this.player.pos.y][this.player.pos.x] = this.player.data();

        if( this.player.hp === 0 || this.player.hp < 0 ){
            this.start();
        }

        this.render.update( this.lvl );

        console.log('move end');

    };

    this.wall = function(){

        var x = this.player.pos.x;
        var y = this.player.pos.y;

        if (x === -1 || x === this.lvl[0].length || y === -1 || y === this.lvl.length) {
            return true;
        }

    };

    this.clear = function( el ){
        var x = el.x;
        var y = el.y;
        if (el.num){
            var d = this.setting.setting['_'];
            this.lvl[y][x] = d;
        } else {
            this.lvl[y][x] = this.setting.setting[' '];
        }        
    }

    this.restart = function(){

        this.start();

    };

    this.LvlUp = function(){
        this.html.update('next');
        this.level += 1;
        this.render.clear();

    };

};

Game.prototype.content = function( name ){
    this.html.update( name );
};

Game.prototype.createLvl = function( name ){

    let lvl_y = [];    
    let map = this.maps[this.level];

    for (let i = 0; i < map.length; i++) {

        let lvl_x = [];

        for (let g = 0; g < map[i].length; g++) {

            let el = Lvl_setting( map[i][g], this.setting.setting, this.setting.lenght );
            // Костыль
            let copy = Object.assign({}, el);
            lvl_x.push(copy);

        }

        lvl_y.push(lvl_x);

    }

    this.lvl = lvl_y;

};

function CreateLvl( map, settng ){

    let lvl_y = [];
    
    
    for (let i = 0; i < map.length; i++) {
        let lvl_x = [];
        for (let g = 0; g < map[i].length; g++) {

            let el = Lvl_setting( map[i][g], settng.setting, settng.lenght );
            // Костыль
            let copy = Object.assign({}, el);
            lvl_x.push(copy);
            

        }
        lvl_y.push(lvl_x);
    }
    
    return lvl_y;

}

function Lvl_setting( map, obj, obj_lenght ){

    let st = 0;
    let el = {};
    let flag = false;
            
    for (let key in obj ) {

        if ( key === map ){
            el = obj[key]
            flag = true;
        }

        st++;
        if (st === obj_lenght && flag === false){
            el = obj['num'];
            el.txt = map;
            //console.log(el.txt);
        }

    }

    

    return el;

}

export default Game;