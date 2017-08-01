import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.introlines = [
      'First came the monsters. Then came the Dark Magus. And then, the reign of terror.',
      'But then there was hope. A star fell into our village, a powerful magical artifact.',
      "I stepped forth and became the chosen hero, binding my lifeforce to the star's light.",
      'Putting my training to use, I fought my way through hordes of monsters.',
      'But in the final confrontation, I realized the Dark Magus had bound herself to the star as well.',
      "To win, I had to destroy the star, sentencing myself to death. I didn't hesitate.",
      "I did it. I saved the world. I'm going to make it home. But I'm almost out of time."
    ]
    this.currentline = 0

    var key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    key.onDown.add(this.skipDialog, this)
    key = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    key.onDown.add(this.skipDialog, this)

    this.text = this.game.add.text(200, 270, this.introlines[0], {
      font: '18pt Arial',
      fill: '#000000',
      wordWrap: true,
      wordWrapWidth: 400
    })
  }

  skipDialog () {
    this.currentline++
    if (this.currentline >= this.introlines.length) {
      this.text.destroy()
      this.state.start('Game')
    } else {
      this.text.text = this.introlines[this.currentline]
    }
  }
}
