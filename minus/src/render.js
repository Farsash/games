function RenderCanvas(){
    this.lvl;
    this.size = 0.8;
    this.id = 'canvas';
    this.c = document.getElementById( this.id );
    this.ctx = this.c.getContext("2d");

    this.s_height = window.innerHeight * this.size;
    this.s_width = window.innerHeight * this.size;
    this.c.setAttribute('width', this.s_width);
    this.c.setAttribute('height', this.s_height);

    this.padding = 0.8;
    this.sizeB = 30;
    this.lemMap = 10;

    this.drawEl = function ( x, y, data ) {

        this.ctx.beginPath();
        
        this.ctx.fillStyle = data.bg;
        
        var sizeGrid = this.s_width / this.lemMap;
        this.ctx.fillRect(y * sizeGrid + (this.padding * 4.5), x * sizeGrid + (this.padding * 4.5), sizeGrid * this.padding, sizeGrid * this.padding);
       
        if (data.txt){

            this.ctx.font = sizeGrid / 1.5 + 'px ' + "Arial";
            this.ctx.fillStyle = data.txt_bg;
            var xt = x * sizeGrid + this.lemMap;
            var yt = y * sizeGrid + this.lemMap;
            this.ctx.fillText( data.txt, yt, xt + (sizeGrid / 2));

        }

    }

    this.update = function( lvl ){
        this.ctx.clearRect(0, 0, this.c.width, this.c.height);
        this.lvl = lvl;
        
        for (var i = 0; i < this.lvl.length; i++) {
            for (var g = 0; g < this.lvl[i].length; g++) {
                this.drawEl(i, g, this.lvl[i][g] );
            }
        }
       
       

    }


}

export default RenderCanvas;