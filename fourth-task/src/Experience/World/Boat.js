import * as THREE from "three";
import Experience from "../Experience.js";

export default class Boat {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resource = this.resources.items.boatModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.x = -27;
    this.model.position.y = 2.25;
    this.model.rotation.y = Math.PI * 0.5;
    this.model.scale.set(2, 2, 2);

    this.scene.add(this.model);
  }
}
