var flagT = true;

var animElement = {
    
    player: {
        move: {
            go: false,
            back: false,
            left: false,
            right: false
        },
        
        forward: function(){
            this.obj.translateZ(setting.player.speed);
        },
        
        back: function(){
            this.obj.translateZ(-setting.player.speed*0.8)
        },
        
        left: function(){
            this.obj.rotation.y -= setting.player.rotat;
        },
        
        right: function(){
            this.obj.rotation.y += setting.player.rotat;
        },
        
        action: function(){
            
            if ( this.move.go === true && this.move.collision === false ) {
                this.forward();
            } else if (this.move.back === true && this.move.collision === false){
                this.back();
            }
            
            if (this.move.left === true){
                this.left();
            } else if(this.move.right === true){
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
    
    collisionTimer: 0,
    
    collisionDetector: function(){
        
        var originPoint = this.player.obj.position.clone();

        for (var vertexIndex = 0; vertexIndex < this.player.obj.geometry.vertices.length; vertexIndex++)
            {		
                var localVertex = this.player.obj.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4( this.player.obj.matrix );
                var directionVector = globalVertex.sub( this.player.obj.position );
                var ray = new THREE.Raycaster( originPoint, localVertex.clone().normalize() );
                var collisionResults = ray.intersectObjects( collisionObjects );
                if ( collisionResults.length > 0 && collisionResults[0].distance < 14 ) {
                    this.player.move.collision = true;
                    flagT = false;
                } else {
                    this.player.move.collision = false;
                    flagT = true;

                    
                }
            }	
     
        
    },

    update: function( delta ){ 
    
        this.collisionDetector();
        
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
    if(e.keyCode == 87 && flagT === true) { // w
        animElement.player.move.go = false;
    }
    else if(e.keyCode == 83 && flagT === true) { // s 
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
    
    var Player = createPlayer( 'player', );
    scene.add(Player);
    
    // Определяем персонажа 
    animElement.player.obj = Player;
    
    
    
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




