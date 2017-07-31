import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'orb')
    this.anchor.setTo(0.5, 1.0)
    this.maxlevel = 30
    this.level = this.maxlevel

    this.contents = game.add.sprite(0, 0, 'orbfill')
    this.contents.anchor.setTo(0.5, 1.0)
    this.addChild(this.contents)

    this.flasheffect = game.add.sprite(0, 0, 'orbflash')
    this.flasheffect.anchor.setTo(0.5, 1.0)
    this.addChild(this.flasheffect)

    this.flasheffect.alpha = 0
  }

  drain (amt) {
    this.level -= amt

    this.flasheffect.alpha = 0.75
    setTimeout(() => {
      this.fade()
    }, 50)

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
      this.game.player.fading(proportionleft)
      return true
    }
  }

  fade () {
    if (this.flasheffect.alpha > 0.25) {
      this.flasheffect.alpha -= 0.25
      setTimeout(() => {
        this.fade()
      }, 50)
    } else {
      this.flasheffect.alpha = 0
    }
  }
}
