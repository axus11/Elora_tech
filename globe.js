import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js";

const container = document.getElementById("scene-container");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 4;

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light = new THREE.PointLight(0xffffff, 3);
light.position.set(5, 3, 5);
scene.add(light);

// =====================================
// PARTICLE GLOBE
// =====================================

const PARTICLES = 15000;

const positions = new Float32Array(PARTICLES * 3);

for (let i = 0; i < PARTICLES; i++) {

    const u = Math.random();
    const v = Math.random();

    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);

    const r = 1;

    positions[i * 3] =
        r * Math.sin(phi) * Math.cos(theta);

    positions[i * 3 + 1] =
        r * Math.cos(phi);

    positions[i * 3 + 2] =
        r * Math.sin(phi) * Math.sin(theta);
}

const globeGeometry = new THREE.BufferGeometry();

globeGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

const globeMaterial = new THREE.PointsMaterial({

    color: 0x33d6ff,

    size: 0.015,

    transparent: true,

    opacity: 0.95,

    depthWrite: false

});

const globe = new THREE.Points(
    globeGeometry,
    globeMaterial
);

scene.add(globe);

// =====================================
// ATMOSPHERE
// =====================================

const atmosphere = new THREE.Mesh(

    new THREE.SphereGeometry(1.03, 64, 64),

    new THREE.MeshBasicMaterial({

        color: 0x33d6ff,

        transparent: true,

        opacity: 0.08,

        side: THREE.BackSide

    })

);

scene.add(atmosphere);

// =====================================
// STARS
// =====================================

const starCount = 6000;

const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {

    starPositions[i * 3] =
        (Math.random() - 0.5) * 400;

    starPositions[i * 3 + 1] =
        (Math.random() - 0.5) * 400;

    starPositions[i * 3 + 2] =
        (Math.random() - 0.5) * 400;
}

const starGeometry = new THREE.BufferGeometry();

starGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(starPositions, 3)

);

const stars = new THREE.Points(

    starGeometry,

    new THREE.PointsMaterial({

        color: 0xffffff,

        size: 0.3

    })

);

scene.add(stars);

// =====================================
// MOUSE ROTATION
// =====================================

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", e => {

    mouseX =
        (e.clientX / window.innerWidth - 0.5) * 2;

    mouseY =
        (e.clientY / window.innerHeight - 0.5) * 2;

});

// =====================================
// ANIMATION
// =====================================

function animate() {

    requestAnimationFrame(animate);

    globe.rotation.y += 0.002;

    atmosphere.rotation.y += 0.0025;

    stars.rotation.y += 0.0002;

    globe.rotation.x += (mouseY * 0.25 - globe.rotation.x) * 0.03;

    globe.rotation.y += (mouseX * 0.25 - globe.rotation.y) * 0.01;

    renderer.render(scene, camera);

}

animate();

// =====================================
// RESPONSIVE
// =====================================

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});