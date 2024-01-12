import * as THREE from "three";
import Experience from "./Experience.js";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

const MAX_SUBMERSION = 2;

export default class Camera {
  constructor() {
    this.CAMERA_POSITION = 5;

    this.experience = new Experience();
    this.world = this.experience.world;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.time = this.experience.time;
    this.raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0)
    );

    this.setInstance();
    this.setControls();
    this.setEventListeners();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      200
    );
    this.instance.position.set(1, this.CAMERA_POSITION, 10);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new PointerLockControls(this.instance, this.canvas);
    this.motionControl = {
      moveForward: false,
      moveRight: false,
      moveBackward: false,
      moveLeft: false,
      canJump: true,
    };
    this.pointerControlsVelocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();

    this.scene.add(this.controls.getObject());
  }

  setEventListeners() {
    this.canvas.addEventListener("click", () => {
      this.controls.lock();
    });

    this.controls.addEventListener("lock", () => {
      console.log("locked");
    });

    this.controls.addEventListener("unlock", () => {
      console.log("un-locked");
    });

    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "KeyW":
          this.motionControl.moveForward = true;
          break;
        case "KeyD":
          this.motionControl.moveRight = true;
          break;
        case "KeyS":
          this.motionControl.moveBackward = true;
          break;
        case "KeyA":
          this.motionControl.moveLeft = true;
          break;
        case "Space":
          if (this.motionControl.canJump) {
            this.pointerControlsVelocity.y += 50;
            this.motionControl.canJump = false;
          }
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.code) {
        case "KeyW":
          this.motionControl.moveForward = false;
          break;
        case "KeyD":
          this.motionControl.moveRight = false;
          break;
        case "KeyS":
          this.motionControl.moveBackward = false;
          break;
        case "KeyA":
          this.motionControl.moveLeft = false;
          break;
      }
    });
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (!this.controls.isLocked) {
      return;
    }
    let distanceToGround = this.CAMERA_POSITION;
    let groundY = null;

    const pointerControlsX = this.controls.getObject().position.x;
    const pointerControlsY = this.controls.getObject().position.y;
    const pointerControlsZ = this.controls.getObject().position.z;
    this.raycaster.ray.origin.copy(this.controls.getObject().position);

    const intersections = this.raycaster.intersectObjects(
      this.world.objectsToIntersect,
      false
    );

    if (intersections.length > 0) {
      distanceToGround = pointerControlsY - intersections[0].point.y;
      groundY = Math.max(
        intersections[0].point.y,
        this.world.water.WATER_POSITION_Y - MAX_SUBMERSION
      );

      if (this.motionControl.canJump) {
        this.controls.getObject().position.y = groundY + this.CAMERA_POSITION;
      }
    } else {
      distanceToGround = pointerControlsY;
    }

    this.pointerControlsVelocity.x -=
      this.pointerControlsVelocity.x * 10.0 * this.time.delta;
    this.pointerControlsVelocity.z -=
      this.pointerControlsVelocity.z * 10.0 * this.time.delta;

    this.direction.z =
      Number(this.motionControl.moveForward) -
      Number(this.motionControl.moveBackward);
    this.direction.x =
      Number(this.motionControl.moveRight) -
      Number(this.motionControl.moveLeft);
    this.direction.normalize();

    if (this.motionControl.moveForward || this.motionControl.moveBackward) {
      this.pointerControlsVelocity.z -=
        this.direction.z * 200.0 * this.time.delta;
    }
    if (this.motionControl.moveLeft || this.motionControl.moveRight) {
      this.pointerControlsVelocity.x -=
        this.direction.x * 200.0 * this.time.delta;
    }

    if (distanceToGround > this.CAMERA_POSITION) {
      this.pointerControlsVelocity.y -= 9.8 * 12 * this.time.delta;
    }

    this.controls.moveRight(-this.pointerControlsVelocity.x * this.time.delta);
    this.controls.moveForward(
      -this.pointerControlsVelocity.z * this.time.delta
    );
    this.controls.getObject().position.y +=
      this.pointerControlsVelocity.y * this.time.delta;

    if (this.controls.getObject().position.y < groundY + this.CAMERA_POSITION) {
      this.pointerControlsVelocity.y = 0;
      this.controls.getObject().position.y = groundY + this.CAMERA_POSITION;
      this.motionControl.canJump = true;
    }

    if (
      pointerControlsX > this.world.worldEdges.max.x ||
      pointerControlsX < this.world.worldEdges.min.x
    ) {
      this.pointerControlsVelocity.x = 0;

      this.controls.getObject().position.x =
        pointerControlsX > this.world.worldEdges.centerX
          ? this.world.worldEdges.max.x
          : this.world.worldEdges.min.x;
    }

    if (
      pointerControlsZ > this.world.worldEdges.max.z ||
      pointerControlsZ < this.world.worldEdges.min.z
    ) {
      this.pointerControlsVelocity.z = 0;

      this.controls.getObject().position.z =
        pointerControlsZ > this.world.worldEdges.centerZ
          ? this.world.worldEdges.max.z
          : this.world.worldEdges.min.z;
    }
  }
}
