import content from './content.js'

function Html(){

    this.update = function( script ){
        document.getElementById('_title').innerHTML = content[script]['_title'];
        document.getElementById('_text').innerHTML = content[script]['_text'];
        document.getElementById('_bt').innerHTML = content[script]['_bt'];

    };

    this.clear = function(){
        this.update('clear');

    };

}

export default Html;