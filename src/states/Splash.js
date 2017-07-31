import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    // Banner
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

    // Loading Bar
    this.loaderBg = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBg'
    )
    this.loaderBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBar'
    )
    centerGameObjects([this.loaderBg, this.loaderBar])
    this.load.setPreloadSprite(this.loaderBar)

    //
    // Load our assets
    //
    // this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('player', 'assets/images/player.png')
    this.load.spritesheet(
      'playerwalk',
      'assets/images/playerwalk.png',
      128,
      256
    )
    this.load.image('npc1', 'assets/images/caldwell.png')
    this.load.image('lily', 'assets/images/lily.png')
    this.load.image('finn', 'assets/images/finn.png')
    this.load.image('seymour', 'assets/images/seymour.png')
    this.load.image('amelia', 'assets/images/amelia.png')
    this.load.image('ground', 'assets/images/ground.png')
    this.load.image('shroud', 'assets/images/shroud.png')
    this.load.image('orb', 'assets/images/orb.png')
    this.load.image('orbfill', 'assets/images/orbfill.png')
    this.load.image('orbflash', 'assets/images/orbflash.png')
    this.load.image('textbox', 'assets/images/textbox.png')
    this.load.image('exclamation', 'assets/images/exclamation.png')
    this.load.image('sky', 'assets/images/sky.png')
  }

  create () {
    this.state.start('Game')
  }
}
