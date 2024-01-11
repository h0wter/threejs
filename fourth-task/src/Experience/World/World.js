import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Ground from "./Ground.js";
import Water from "./Water.js";

const DEFAULT_WORLD_EDGES = {
  min: {
    x: null,
    z: null,
  },
  max: {
    x: null,
    z: null,
  },
  centerX: null,
  centerZ: null,
};

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.objectsToIntersect = [];
    this.worldEdges = DEFAULT_WORLD_EDGES;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.ground = new Ground();
      this.water = new Water();
      this.environment = new Environment();
    });
  }
}
