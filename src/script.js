import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertex from './shaders/test/vertex.glsl';
import fragment from './shaders/test/fragment.glsl';
import GUI from 'lil-gui';
import { color } from 'three/tsl';

// Scene setup
const scene = new THREE.Scene();
const clock = new THREE.Clock();
// Camera setup
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geometry = new THREE.PlaneGeometry(2, 2, 512, 512);
const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment, 
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: { value: 0 },
        uBigWaveElevation: { value: 0.2 },
        uBigWaveFrequencyX: { value: 4.0 },
        uBigWaveFrequencyY: { value: 1.5 },
        uSmallWaveElevation: { value: 0.15 },
        uSmallWaveFrequency: { value: 3.0 },
        uSmallWaveSpeed: { value: 0.2 },
        uSmallIterations: { value: 4.0 },
        uColor1: { value: new THREE.Color('#186691') },
        uColor2: { value: new THREE.Color('#9bd8ff') },
        colorMultiplier: { value: 5.0},
        colorOffset: { value: 0.08 }

    }
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = - Math.PI * 0.5;
scene.add(plane);
const gui = new GUI();
gui.add(material.uniforms.uBigWaveElevation, 'value', 0, 1, 0.01).name('Wave Elevation');
gui.add(material.uniforms.uBigWaveFrequencyX, 'value', 0, 10, 0.01).name('Wave Frequency X');
gui.add(material.uniforms.uBigWaveFrequencyY, 'value', 0, 10, 0.01).name('Wave Frequency Y');
gui.addColor({ color2: '#186691' }, 'color2').onChange((value) => {
    material.uniforms.uColor2.value.set(value);
}).name('Color 2');
gui.addColor({ color1: '#9bd8ff' }, 'color1').onChange((value) => {
    material.uniforms.uColor1.value.set(value);
}).name('Color 1');
gui.add(material.uniforms.colorMultiplier, 'value', 0, 5, 0.01).name('Color Multiplier');
gui.add(material.uniforms.colorOffset, 'value', 0, 1, 0.01).name('Color Offset');
gui.add(material.uniforms.uSmallWaveElevation, 'value', 0, 1, 0.01).name('Small Wave Elevation');
gui.add(material.uniforms.uSmallWaveFrequency, 'value', 0, 30, 0.01).name('Small Wave Frequency');
gui.add(material.uniforms.uSmallWaveSpeed, 'value', 0, 4, 0.01).name('Small Wave Speed');
gui.add(material.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    const elapesedTime = clock.getElapsedTime();
    material.uniforms.uTime.value = elapesedTime;
    requestAnimationFrame(tick);
};

tick();
