import * as THREE from "three";
import { Water as WaterShader } from "three/addons/objects/Water2.js";
import Experience from "../Experience.js";

export default class Water {
  constructor() {
    this.WATER_POSITION_Y = 2;

    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setGeometry();
    this.setWater();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(140, 140, 2048, 2048);
  }

  setWater() {
    this.water = new WaterShader(this.geometry, {
      color: "#ffffff",
      scale: 4,
      textureWidth: 1024,
      textureHeight: 1024,
    });

    this.water.position.y = this.WATER_POSITION_Y;
    this.water.rotation.x = Math.PI * -0.5;

    this.scene.add(this.water);
  }
}
