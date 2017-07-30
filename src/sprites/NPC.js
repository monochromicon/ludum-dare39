import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset, name, mandatory }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 1.0)
    this.dialogTree = 0 // TODO
    this.mandatory = mandatory
    this.name = name
    this.talked = false
  }

  interact() {
    // Talk
  }

  update() {
    // if (this.game.player.x <= this.x) {
    //   this.scale.setTo(-1, 1)
    // } else {
    //   this.scale.setTo(1, 1)
    // }
  }
}
