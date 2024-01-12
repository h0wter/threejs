import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createRandomFigure } from "./helpers/create-random-figure.helper.js";
import { generateVertexes } from "./helpers/generate-vertexes.helper.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#242424");

const DURATION = 9;

let cubes = null;

const explodeCube = () => {
  const { children } = cubes;

  for (const child of children) {
    if (!child.isCamera) {
      gsap.to(child.position, {
        duration: DURATION,
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        z: (Math.random() - 0.5) * 50,
      });
      gsap.to(child.rotation, {
        duration: DURATION,
        x: (Math.random() - 0.5) * Math.PI * 8,
        y: (Math.random() - 0.5) * Math.PI * 8,
      });
    }
  }
};

const buildCanvas = (canvas, cubeParams) => {
  scene.clear();
  cubes = new THREE.Group();

  const { x, y, z, isWireframeEnabled } = cubeParams;

  const numberOfFigures = x * y * z;
  const SIZES = {
    width: canvas.offsetWidth,
    height: canvas.offsetHeight,
  };

  const vertexes = generateVertexes(cubeParams);

  for (let i = 0; i < numberOfFigures; i++) {
    const { x, y, z } = vertexes[i];
    const mesh = createRandomFigure(isWireframeEnabled);
    mesh.position.set(x, y, z);
    cubes.add(mesh);
  }

  scene.add(cubes);

  const box = new THREE.Box3();
  box.setFromObject(cubes);

  const offsetX = (box.max.x + box.min.x) / 2;
  const offsetY = (box.max.y + box.min.y) / 2;
  const offsetZ = (box.max.z + box.min.z) / 2;

  cubes.translateX(-offsetX);
  cubes.translateY(-offsetY);
  cubes.translateZ(-offsetZ);

  const camera = new THREE.PerspectiveCamera(75, SIZES.width / SIZES.height);
  camera.position.z = 7;

  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({
    canvas,
  });
  renderer.setSize(SIZES.width, SIZES.height);
  renderer.render(scene, camera);

  const tick = () => {
    requestAnimationFrame(tick);
    controls.update();
    renderer.render(scene, camera);
  };

  tick();
};

export { buildCanvas, explodeCube };
