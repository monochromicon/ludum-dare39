import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'orb')
    this.anchor.setTo(0.5, 1.0)
    this.level = 30
    this.maxlevel = 30
    this.contents = game.add.sprite(0, 0, 'orbfill')
    this.contents.anchor.setTo(0.5, 1.0)
    this.addChild(this.contents)
  }

  drain (amt) {
    this.level -= amt
    if (this.level <= 0) {
      return false
    } else {
      let proportionleft = this.level / this.maxlevel
      this.contents.crop(
        {
          x: 0,
          y: 128 - 112 * proportionleft,
          height: 128,
          width: 128
        },
        true
      )
      return true
    }
  }

  update () {
    this.contents.updateCrop()
  }
}
