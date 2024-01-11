import * as THREE from "three";
import Experience from "../Experience.js";

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resource = this.resources.items.groundModel;

    this.setModel();
    this.setWorldEdges();
  }

  setModel() {
    this.model = this.resource.scene.children[0];

    this.scene.add(this.model);
    this.world.objectsToIntersect.push(this.model);
  }

  setWorldEdges() {
    const box = new THREE.Box3();
    box.setFromObject(this.model);

    this.world.worldEdges.min.x = box.min.x * 0.95;
    this.world.worldEdges.min.z = box.min.z * 0.95;
    this.world.worldEdges.max.x = box.max.x * 0.95;
    this.world.worldEdges.max.z = box.max.z * 0.95;

    this.world.worldEdges.centerX =
      (this.world.worldEdges.max.x + this.world.worldEdges.min.x) / 2;
    this.world.worldEdges.centerZ =
      (this.world.worldEdges.max.z + this.world.worldEdges.min.z) / 2;
  }
}
