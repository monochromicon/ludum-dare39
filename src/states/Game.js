import Phaser from 'phaser'
import Player from '../sprites/Player'
// import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'When It Counts'
    let banner = this.add.text(
      this.world.centerX,
      this.game.height - 80,
      bannerText
    )
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.player = new Player({
      game: this.game,
      x: 100,
      y: 500,
      asset: 'player'
    })

    this.game.add.existing(this.player)

    // key mapping here
    this.game.input.keyboard.addKeyCapture([
      Phaser.KeyCode.SPACEBAR,
      Phaser.KeyCode.UP,
      Phaser.KeyCode.DOWN,
      Phaser.KeyCode.LEFT,
      Phaser.KeyCode.RIGHT
    ])
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }
}
