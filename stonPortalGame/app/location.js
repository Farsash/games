var LoadLocation = function( path, size, arrAnimation ){    
    FBXloader.load( path, function ( object ) {
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material = materials[child.name];
            }
        } );
        object.scale.set(size, size, size);
        scene.add( object );
        animElement.add(arrAnimation);
    } ); 
}
