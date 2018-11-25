var geometry_line = new THREE.Geometry();
geometry_line.vertices.push(new THREE.Vector3( 0, 0, 0) );
geometry_line.vertices.push(new THREE.Vector3( 0, 80, 50) );

var line = new THREE.Line( geometry_line, new THREE.LineBasicMaterial( { color: 0x0000ff } ) );
scene.add(line);

var Playclone;

var animElement = {
    
    player: {
        clone: false,
        move: {
            go: false,
            back: false,
            left: false,
            right: false
        },
        
        forward: function(){
            this.obj.translateX(setting.player.speed);
            if (this.clone === true){
                Playclone.translateX(setting.player.speed);
            }
        },
        
        back: function(){
            this.obj.translateX(-setting.player.speed*0.8)
            if (this.clone === true){
                Playclone.translateX(-setting.player.speed*0.8);
            }
        },
        
        left: function(){
            this.obj.rotation.y -= setting.player.rotat;
            if (this.clone === true){
                Playclone.rotation.y -= setting.player.rotat;
            }
        },
        
        right: function(){
            this.obj.rotation.y += setting.player.rotat;
            if (this.clone === true){
                Playclone.rotation.y += setting.player.rotat;
            }
        },
        
        action: function(){
            
            if ( this.move.go === true && this.move.collision === false ) {    
                this.forward();
            } else if (this.move.back === true  && this.move.collision === false){
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
        
    tachDetector: function(){
        
        var direction, vec;
        
        line.geometry.vertices[0] = this.player.obj.position
        
        if ( this.player.move.back === true ){
            direction = new THREE.Vector3( -1000, 0, 0 );
            vec = new THREE.Vector3( -100, 0, 0 );
        } else {
            direction = new THREE.Vector3( 1000, 0, 0 );
            vec = new THREE.Vector3( 100, 0, 0 );
        }
        
         
        direction.applyMatrix4( this.player.obj.matrix );
        
        line.geometry.vertices[1] = vec;
        line.geometry.vertices[1].applyMatrix4( this.player.obj.matrix );
 
        line.geometry.verticesNeedUpdate = true;
        

        raycaster.set(  this.player.obj.position,  direction.normalize() );

        var intersects = raycaster.intersectObjects( collisionObjects );

        for ( var i = 0; i < intersects.length; i++ ) {
            
            if ( intersects[ 0 ].distance < 10 ){                
                
                if ( intersects[ 0 ].object.name === '_portal'){
                    
                    if ( this.player.clone === false ){
                        
                        playermat.uniforms.run.value = 1.0;
                        this.player.clone = true;
                        CloneElemntFromPortal( this.player.obj );
                        
                    }
                    
                    
                } else {
                    
                   this.player.move.collision = true;    
                    
                }               
                
                
            } else {
                
                this.player.move.collision = false;
                
            }

        }
        
        
        
    },

    update: function( delta ){ 
    
        //this.collisionDetector();
        
        this.tachDetector();
        
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



function CloneElemntFromPortal( el ){
    
    RecoveryPoint = scene.getObjectByName( 'Empty' );
    console.log(RecoveryPoint);
    
    Playclone = el.clone();
    
    var geometry = new THREE.BoxBufferGeometry( 20, 50, 50 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(RecoveryPoint.position.x, el.position.y, RecoveryPoint.position.z);
    cube.rotation.y = -90*Math.PI/180;
    scene.add( cube );
    
    Playclone.position.set(RecoveryPoint.position.x, el.position.y, RecoveryPoint.position.z);
    Playclone.rotation.y = 90*Math.PI/180;
    
    scene.add(Playclone);
    
    console.log(Playclone);
    
}

//RecoveryPoint

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




