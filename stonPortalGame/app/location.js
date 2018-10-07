
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
        } );
        
        object.scale.set( setting.worldSize, setting.worldSize, setting.worldSize);
        scene.add( object );
        
        if (arrAnimation){
            animElement.add(arrAnimation);
        }
        
    } ); 
}
