import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 1.0)
    this.inputEnabled = true
    this.speed = 3
  }

  interact() {
    // Talk
  }

  update () {
    var left = game.input.keyboard.isDown(Phaser.KeyCode.LEFT)
    var right = game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)
    var space = game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
    if (space) {
      this.interact()
    }
    if (left && !right) {
      this.x -= this.speed
      this.scale.setTo(-1, 1);
    }
    if (right && !left) {
      this.x += this.speed
      this.scale.setTo(1, 1);
    }
  }
}
