import Phaser from 'phaser'
import Player from '../sprites/Player'
import NPC from '../sprites/NPC'
import Dialog from '../sprites/Dialog'
// import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {
    console.log('hey')
  }
  preload () {}

  create () {
    // Stage boundaries
    this.game.gameWidth = 3600
    this.game.world.setBounds(0, 0, this.game.gameWidth, 800)

    this.game.paused = false

    // Populate world
    this.game.sky = this.game.add.sprite(0, 0, 'sky')
    for (let i = 0; i <= this.game.gameWidth + 256; i += 256) {
      this.game.add.sprite(i, 600 - 128, 'ground')
    }
    this.game.npcs = [
      new NPC({
        game: this.game,
        x: 500,
        y: 500,
        asset: 'npc1',
        name: 'Caldwell',
        mandatory: true
      }),
      new NPC({
        game: this.game,
        x: 1200,
        y: 500,
        asset: 'finn',
        name: 'Caldwell',
        mandatory: false
      }),
      new NPC({
        game: this.game,
        x: 1900,
        y: 500,
        asset: 'lily',
        name: 'Caldwell',
        mandatory: false
      }),
      new NPC({
        game: this.game,
        x: 2600,
        y: 500,
        asset: 'seymour',
        name: 'Caldwell',
        mandatory: false
      }),
      new NPC({
        game: this.game,
        x: 3300,
        y: 500,
        asset: 'amelia',
        name: 'Caldwell',
        mandatory: false
      })
    ]
    for (let i = 0; i < this.game.npcs.length; i++) {
      this.game.add.existing(this.game.npcs[i])
    }

    // player
    this.game.player = new Player({
      game: this.game,
      x: 100,
      y: 540,
      asset: 'playerwalk'
    })
    this.game.add.existing(this.game.player)

    // Conversation mode objects
    this.game.convo = new Dialog({
      game: this.game,
      x: 0,
      y: 0
    })
    this.game.add.existing(this.game.convo)

    // Capture key inputs to prevent page scrolling
    this.game.input.keyboard.addKeyCapture([
      Phaser.KeyCode.SPACEBAR,
      Phaser.KeyCode.UP,
      Phaser.KeyCode.DOWN,
      Phaser.KeyCode.LEFT,
      Phaser.KeyCode.RIGHT
    ])
  }

  die () {
    console.log('Dead')
    // this.game.camera.fade()
    this.game.die()
    // this.game.camera.onFadeComplete.add(() => {
    //   this.state.start('End')
    // }, this)
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)
    // }
  }

  // update () {
  //   this.game.convo.update()
  // }
}
