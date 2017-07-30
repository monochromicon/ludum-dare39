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
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])
    this.load.setPreloadSprite(this.loaderBar)

    //
    // Load our assets
    //
    // this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('player', 'assets/images/player.png')
    this.load.image('npc1', 'assets/images/npc1.png')
    this.load.image('ground', 'assets/images/ground.png')
  }

  create () {
    this.state.start('Game')
  }
}
