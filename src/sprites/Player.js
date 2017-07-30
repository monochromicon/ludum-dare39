/* global game */
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
    var left = this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)
    var right = this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)
    var space = this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
    var bounds = this.game.world.getBounds()

    if (space) {
      this.interact()
    }
    
    console.log(bounds)
    if (left && !right && this.x > 64) {
      this.x -= this.speed
      this.scale.setTo(-1, 1)
      this.game.camera.x = this.x - 400
    }
    if (right && !left && this.x < this.game.gameWidth - 64) {
      this.x += this.speed
      this.scale.setTo(1, 1)
      this.game.camera.x = this.x - 400
    }
  }
}
