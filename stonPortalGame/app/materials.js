var Envmat = new THREE.ShaderMaterial({
    uniforms: { mask: { type: "t", value: T_loader.load("res/env.png" ) }},
    vertexShader:`
        varying vec2 vUv;
        void main(){
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
            gl_Position = projectionMatrix * mvPosition;
        }
    `,

    fragmentShader:`
        varying vec2 vUv;
        uniform sampler2D mask;
        void main(){
            vec4 mask = texture2D(mask, vUv);
            vec4 gr = mix(vec4(0.265,0.740,0.324,1.),vec4(0.288,0.315,0.290,1.), mask.r);
            gl_FragColor = gr * mask.a;
        }
    `,
    side:THREE.DoubleSide
});


var materials = {
    Env: Envmat,
    stone:  new THREE.MeshBasicMaterial( { color: 0x777777 } ),
    portal_1: new THREE.MeshBasicMaterial( { color: 0xff0077 } ),
    portal_2: new THREE.MeshBasicMaterial( { color: 0x007777 } )
}