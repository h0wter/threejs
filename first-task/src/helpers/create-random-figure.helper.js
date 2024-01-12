import * as THREE from "three";
import { getRandomTexture } from "./get-random-texture.helper.js";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5);

const geometries = [
  boxGeometry,
  cylinderGeometry,
  sphereGeometry,
  icosahedronGeometry,
];

const createRandomFigure = (isWireframeEnabled) => {
  const randomPosition = Math.floor(Math.random() * 4);
  const material = new THREE.MeshBasicMaterial({ map: getRandomTexture() });
  material.wireframe = !!isWireframeEnabled;
  return new THREE.Mesh(geometries[randomPosition], material);
};

export { createRandomFigure };
