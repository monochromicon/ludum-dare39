import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 1.0)
    this.dialogTree = 0 //TODO
  }

  interact() {
    // Talk
  }

  update () {
  }
}
