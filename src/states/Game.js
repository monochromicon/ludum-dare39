/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import NPC from '../sprites/NPC'
// import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    // Populate world
    this.game.add.existing(new NPC({
      game: this.game,
      x: 800,
      y: 500,
      asset: 'npc1'
    }))

    this.player = new Player({
      game: this.game,
      x: 100,
      y: 500,
      asset: 'player'
    })
    this.game.add.existing(this.player)

    // Capture key inputs to prevent page scrolling
    this.game.input.keyboard.addKeyCapture( [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.UP, Phaser.KeyCode.DOWN, Phaser.KeyCode.LEFT, Phaser.KeyCode.RIGHT] )

  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }
}
