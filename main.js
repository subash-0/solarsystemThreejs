import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
//font loader
const loader = new FontLoader();
loader.load('./src/assests/fonts/28_Days_Later_Regular.json', (font) => {
    const geometry = new TextGeometry('Subash Kumar Yadav', {  
        font: font,
        size: 10,
        
        height: 5,
         });
    const textMesh = new THREE.Mesh(geometry,
        [ 
            new THREE.MeshPhongMaterial({ color: 0x00ffff }),
            new THREE.MeshPhongMaterial({ color: 0xffff00 })
         ]
         );
         textMesh.castShadow = true;
         textMesh.position.set(-100, 40, -100);
         textMesh.rotation.z = -Math.PI /36;
        //  textMesh.rotation.y = -Math.PI / 2;
            scene.add(textMesh);

 });



//import images

import startTexture from './src/assests/stars.jpg'
import sunTexture from './src/assests/sun.jpg'
import mercuryTexture from './src/assests/mercury.jpg'
import venusTexture from './src/assests/venus.jpg'
import earthTexture from './src/assests/earth.jpg'
import marsTexture from './src/assests/mars.jpg'
import jupiterTexture from './src/assests/jupiter.jpg'
import saturnTexture from './src/assests/saturn.jpg'
import uranusTexture from './src/assests/uranus.jpg'
import neptuneTexture from './src/assests/neptune.jpg'
import plutoTexture from './src/assests/pluto.jpg'
import saturnRingTexture from './src/assests/saturnRing.png'
import uranusRingTexture from './src/assests/uranusRing.png'



const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);


const arbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 120, 200);
arbit.update();

//Light
const light = new THREE.AmbientLight(0x333333);
scene.add(light);




//background

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([ 
    startTexture,
    startTexture,
    startTexture,
    startTexture,
    startTexture,
    startTexture,
    ]);

const textureLoader = new THREE.TextureLoader();
///cratING THE SUN
const sunGeometry = new THREE.SphereGeometry(16,30,30);
const sunMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//creating the planets
function createPlane(radius, texture, x,ring) {
    const geometry = new THREE.SphereGeometry(radius, 30, 30);
    const material = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) });
    const mesh = new THREE.Mesh(geometry, material);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    mesh.position.x = x;
        if (ring) {
            const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
            const ringMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load(ring.texture) , side: THREE.DoubleSide});
            const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);
            mesh.add(ringMesh);
           ringMesh.rotation.x =- Math.PI / 2;
            
    }
    scene.add(obj);
    return {mesh, obj};
}

const mercury = createPlane(3.2, mercuryTexture, 28);
const venus = createPlane(5.8, venusTexture, 44);
const saturn = createPlane(10, saturnTexture, 138, { innerRadius: 10, outerRadius: 20, texture: saturnRingTexture });
const earth = createPlane(6, earthTexture, 62);
const mars = createPlane(4, marsTexture, 78);
const jupiter = createPlane(12, jupiterTexture, 100);
const uranus = createPlane(7, uranusTexture, 176,{ innerRadius: 7, outerRadius: 12, texture: uranusRingTexture });
const neptune = createPlane(7, neptuneTexture, 200);
const pluto = createPlane(2.8, plutoTexture, 215);
// const saturnyGeo = new THREE.SphereGeometry(10, 30, 30);
// const saturnMaterial = new THREE.MeshStandardMaterial({ map: textureLoader.load(saturnTexture) });
// const saturn = new THREE.Mesh(saturnyGeo, saturnMaterial);
// const saturnobj = new THREE.Object3D();
// saturnobj.add(saturn);
// scene.add(saturnobj);
// saturn.position.x = 120;


// const saturnyRing = new THREE.RingGeometry(10, 30, 30);
// const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load(saturnRingTexture) , side: THREE.DoubleSide});
// const saturnRing = new THREE.Mesh(saturnyRing, saturnRingMaterial);
// saturn.add(saturnRing);
// saturnRing.rotation.x =- Math.PI / 2;

// const pointLight = new THREE.PointLight(0xffffff,5500,300);
// scene.add(pointLight);
const spotLight = new THREE.SpotLight(0x00ffff,200,500,Math.PI,0.5,1);
scene.add(spotLight);




function animate() {
    //plane-self rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.04);
    venus.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    earth.mesh.rotateY(0.02);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.08);


    //planet arbital rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);




    


    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});
