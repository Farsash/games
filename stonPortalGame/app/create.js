var FBXloader = new THREE.FBXLoader();
var T_loader = new THREE.TextureLoader();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 20000 );
	camera.position.z = 1500;
var controls = new THREE.OrbitControls( camera );
var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );