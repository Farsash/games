function DrawSetting( setting ){

    this.lenght = 0;

    this.setting= setting;

    this.update = function(){

        for ( var key in this.setting ) {

            this.lenght++;

        }

    };

} 

export default DrawSetting;