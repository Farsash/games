import RenderCanvas from "./render.js";

function Game( maps, setting ){

    this.level = 0;
    this.maps = maps;
    this.lvl = {};
    this.setting = setting;
    this.render = new RenderCanvas();

    this.update = function(){

        this.render.update( this.lvl );

    };

    this.start = function(){

        this.lvl = CreateLvl( this.maps[this.level], this.setting );

    };

    this.restart = function(){

        this.start();
        this.update();

    };

    this.LvlUp = function(){


    };

}

function CreateLvl( map, settng ){

    var lvl_y = [];
    
    for (var i = 0; i < map.length; i++) {
        var lvl_x = [];
        for (var g = 0; g < map[i].length; g++) {

            var el = Lvl_setting( map[i][g], settng.setting, settng.lenght );
            // Костыль
            var copy = Object.assign({}, el);
            lvl_x.push(copy);
            

        }
        lvl_y.push(lvl_x);
    }
    
    return lvl_y;

}

function Lvl_setting( map, obj, obj_lenght ){

    var st = 0;
    var el = {};
    var flag = false;
            
    for (var key in obj ) {

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

function Canvas(){

}

export default Game;