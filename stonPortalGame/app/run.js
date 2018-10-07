var animElement = {
    
    player: {
        move: {
            go: false,
            back: false,
            left: false,
            right: false
        },
        
        forward: function(){
            this.obj.translateY(-setting.player.speed);
        },
        
        back: function(){
            this.obj.translateY(setting.player.speed*0.8)
        },
        
        left: function(){
            this.obj.rotation.z -= setting.player.rotat;
        },
        
        right: function(){
            this.obj.rotation.z += setting.player.rotat;
        },
        
        action: function(){
            if (this.move.go === true ){
                this.forward();
            } else if (this.move.back === true ) {
                this.back();
            }            
            if (this.move.left === true ) {
                this.left();
            } else if (this.move.right === true ) {
                this.right();
            }
        }
    },
    
    portals: function(){
        playermat.uniforms.portal.value = this.portal_1.position;
    },
    
    // Добавление объектов для анимации. Происходит внутри функции LoadLocation()
    add: function( name ){
        name.forEach(function( e ) {
            animElement[e] = scene.getObjectByName( e );
        });  
    },    

    update: function( delta ){ 
        
        this.portal_1.rotation.z += 0.08;
        
        portal_2mat.uniforms.time.value += 0.08;
        
        this.player.action();
        
	    if ( mixers.length > 0 ) {
            for ( var i = 0; i < mixers.length; i ++ ) {
                mixers[ i ].update( delta );
            }
		}
        
    }   
    
}



loadObjects('models', ['portal_1']); //( путь, [доступ к элементам по имени] )
loadObjects('monstr');

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 87)  { // w
        animElement.player.move.go = true;

    }
    else if(e.keyCode == 83) { // s
        animElement.player.move.back = true;
    }
    
    else if(e.keyCode == 68) { // d
        animElement.player.move.left = true;
    }
    
    else if(e.keyCode == 65) { // a
        animElement.player.move.right = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 87) { // w
        animElement.player.move.go = false;
    }
    else if(e.keyCode == 83) { // s 
        animElement.player.move.back = false;    

    }
    else if(e.keyCode == 68) { // d
        animElement.player.move.left = false;
    }
    
    else if(e.keyCode == 65) { // a
        animElement.player.move.right = false;
    }
}





manager.onLoad = function () {
    
    // Определяем персонажа 
    animElement.player.obj = scene.getObjectByName( 'player' );
    
    // Определяем местоположение портала
    animElement.portals();
    
    // Запускаем анимацию
	animate();

};



var animate = function () {
    
    var delta = clock.getDelta();    
    requestAnimationFrame( animate );
    
    
    // Обновляем анимацию
    animElement.update(delta);
    
    renderer.render( scene, camera );    
    controls.update();
    
};




