/* global game */
import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 1.0)
    this.inputEnabled = true
    this.speed = 3
    this.nextTo = false
    this.exclamation = game.add.sprite(0, -300, 'exclamation')
    this.addChild(this.exclamation)
    this.exclamation.anchor.setTo(0.5, 0.5)
    this.exclamation.visible = false
    this.animations.add('walk', [1, 2, 3, 4, 5, 6, 0], 8, true)
    this.frame = 1
  }

  interact (npc) {
    // Talk
    this.game.paused = true
    npc.talked = true
    this.exclamation.visible = false
    this.game.convo.startConvo(npc.name)
  }

  update () {
    var left = this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)
    var right = this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)
    var space = this.game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
    var bounds = this.game.world.getBounds()

    // Abort if paused
    if (this.game.paused) {
      return
    }

    // Move
    if (left && !right && this.x > 64) {
      this.x -= this.speed
      this.scale.setTo(-1, 1)
      this.animations.play('walk')
    } else if (right && !left && this.x < this.game.gameWidth - 64) {
      this.x += this.speed
      this.scale.setTo(1, 1)
      this.animations.play('walk')
    } else {
      this.animations.stop()
    }
    this.game.camera.x = this.x - 400
    this.game.convo.x = this.game.camera.x
    this.game.sky.x = this.game.camera.x * 0.95

    // Check NPCS
    this.nextTo = false
    for (let i = 0; i < this.game.npcs.length; i++) {
      let npc = this.game.npcs[i]
      if (this.overlap(npc) && !npc.talked) {
        this.nextTo = npc
      }
    }
    this.exclamation.visible = !!this.nextTo
    if (this.nextTo) {
      if (space || this.nextTo.mandatory) {
        this.interact(this.nextTo)
        this.nextTo.mandatory = false
      }
    }
  }
}
