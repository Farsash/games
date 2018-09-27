FBXloader.load( 'res/models.FBX', function ( object ) {
    object.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.material = materials[child.name];
        }
    } );
    object.scale.set(0.3, 0.3, 0.3);
    scene.add( object );
} );

var animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  controls.update();
};

animate();