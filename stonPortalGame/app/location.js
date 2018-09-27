FBXloader.load( 'res/models.FBX', function ( object ) {
    object.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.material = new THREE.MeshBasicMaterial( { map: T_loader.load('res/none.png') } );
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