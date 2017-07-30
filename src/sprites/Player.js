/* global game */
import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 1.0)
    this.inputEnabled = true
    this.speed = 3
    this.nextTo = false
  }

  interact(npc) {
    // Talk
    console.log(npc.name)
  }

  update () {
    var left = this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)
    var right = this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)
    var space = this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
    var bounds = this.game.world.getBounds()

    // Move
    if (left && !right && this.x > 64) {
      this.x -= this.speed
      this.scale.setTo(-1, 1)
    }
    if (right && !left && this.x < this.game.gameWidth - 64) {
      this.x += this.speed
      this.scale.setTo(1, 1)
    }
    this.game.camera.x = this.x - 400

    // Check NPCS
    for (let i = 0; i < this.game.npcs.length; i++) {
      let npc = this.game.npcs[i]
      this.nextTo = false
      if (this.overlap(npc)) {
        this.nextTo = npc
      }
    }
    if (this.nextTo) {
      if (space || this.nextTo.mandatory) {
        this.interact(this.nextTo)
        this.nextTo.mandatory = false
      }
    }
  }
}
