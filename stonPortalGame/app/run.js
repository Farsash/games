var animElement = {
    // Добавление объектов для анимации. Происходит внутри функции LoadLocation()
    add: function( name ){
        name.forEach(function( e ) {
            animElement[e] = scene.getObjectByName( e );
        });  
    },    
    // Вызов объекто для анимации
    update: function(){
        this.portal_1.rotation.z += 0.08;
        portal_2mat.uniforms.time.value += 0.08;
    }
}

LoadLocation('res/models.FBX', 0.3, ['portal_1']); //(path, size, arrAnimation)

var animate = function () {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    animElement.update();
    controls.update();
};

animate();