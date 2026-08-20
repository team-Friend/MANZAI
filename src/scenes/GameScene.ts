import { Scene } from "phaser";

export class GameScene extends Scene {
  preload() {
    this.load.image("boke1", "assets/images/boke.png");
    this.load.image("tukkomi1", "assets/images/tukkomi.png");
  }

  create() {
    this.add.image(200, 300, "boke1");
    this.add.image(600, 300, "tukkomi1");
  }
}
