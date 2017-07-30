import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor ({ game, x, y }) {
    super(game, x, y, 'textbox')
    this.textBoxes = []
    this.otherBox = null
    this.style = {font: '20pt Arial', wordWrap: true, wordWrapWidth: 200}
  }

  setPlayerText (text) {
    // out with the old
    for (let i = 0; i < this.textBoxes.length; i++) {
      this.removeChild(this.textBoxes[i])
      this.textBoxes[i].destroy()
    }
    // in with the new
    for (let i = 0; i < text.length; i++) {
      this.textBoxes[i] = new TextBox(this.game, 0, 40 * i, text[i], this.style, i)
      this.addChild(this.textBoxes[i])
    }
  }

  setOtherText (text) {
    // out with the old
    if (this.otherBox) {
      this.removeChild(this.otherBox)
      this.otherBox.destroy()
    }
    // in with the new
    this.otherBox = new TextBox(this.game, 200, 0, text, this.style, -1)
    this.addChild(this.otherBox)
  }

  update () {
  }
}
