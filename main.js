
let scene = null;
let camera = null;
let renderer = null;
let cube = null;

function animate() {
    requestAnimationFrame( animate );
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

function main() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    //camera.position.set(0, 10, 20);
    
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
    }
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    var controls = new THREE.OrbitControls( camera, renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var loader = new THREE.OBJLoader();
    loader.load("Candycane/Candycane.obj",
        // called when the object is ready
        (o) => {
            //let material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
            //let cc = new THREE.Mesh(o,material);
            scene.add(o);
        }
    );

    camera.position.z = 5;
    animate();

}

window.onload = main;