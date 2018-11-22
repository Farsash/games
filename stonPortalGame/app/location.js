
var loadObjects = function( name, arrAnimation ){    
    FBXloader.load( setting.models.path + name + '.FBX', function ( object ) {
        
        object.name = name;

        // Проверка на наличие анимации
        
        if (object.animations){
            
            object.mixer = new THREE.AnimationMixer( object );
            mixers.push( object.mixer );
            var action = object.mixer.clipAction( object.animations[ 0 ] );
			action.play();
            
        }

        
        object.traverse( function ( child ) {
            
            if ( child.isMesh ) {
                
                
                
                if ( child.name.charAt(0) === "_"){
                    collisionObjects.push(child);
                    child.layers.mask = 1;
                    child.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, transparent: true } );
                } else {
                    
                    if (materials[child.name]){
                        child.material = materials[child.name];
                    } else {
                        // На случай, если забыл задать имя модели
                        child.material = materials['noneMTL'];
                    }   

                    if ( object.animations ){
                        // =============== Без этого анимация не будет работать
                        child.material.skinning = true;
                    }
                    
                }
                
            }
        } );
        
        object.scale.set( setting.worldSize, setting.worldSize, setting.worldSize);
        scene.add( object );
        
        if (arrAnimation){
            animElement.add(arrAnimation);
        }
        
    } ); 
}

var CollisionBox = function( position ){
    
    var geometry = new THREE.BoxGeometry( 20, 20, 20 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true, transparent: true } )
    var cube = new THREE.Mesh( geometry, material );
    cube.layers.mask = 1;
    cube.position.set( position.x / 2, position.y, position.z / 2 );
    return cube ;    
    
}


var createPlayer = function( name ){
    
    var player = scene.getObjectByName( 'player' );   
    
    var Collision = CollisionBox( player.position );
    
    // Костыль
    player.position.y = player.position.y/10;
    
    Collision.add(player);
    
    
    return Collision; 
    
}
