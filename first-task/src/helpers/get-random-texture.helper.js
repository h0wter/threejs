import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const waterTexture = textureLoader.load("/textures/water-texture.jpg");
const fireTexture = textureLoader.load("/textures/fire-texture.jpg");
const earthTexture = textureLoader.load("/textures/earth-texture.jpg");
waterTexture.colorSpace = THREE.SRGBColorSpace;
fireTexture.colorSpace = THREE.SRGBColorSpace;
earthTexture.colorSpace = THREE.SRGBColorSpace;

const textures = [waterTexture, fireTexture, earthTexture];

const getRandomTexture = () => {
  const randomIndex = Math.ceil(Math.random() * textures.length) - 1;

  return textures[randomIndex];
};

export { getRandomTexture };
