import Phaser from 'phaser'
import Orb from '../sprites/Orb'
import TextBox from '../sprites/TextBox'
import { dialogue } from '../utils'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'shroud')
    this.textBoxes = []
    this.otherBox = null
    this.style = { font: '12pt Arial', fill: "#ffffff", wordWrap: true, wordWrapWidth: 276 }
    this.orb = new Orb({game: game, x: 400, y: 600})
    this.addChild(this.orb)
    this.dialogTree = null
    this.currNode = null
    this.visible = false
  }

  startConvo (name) {
    this.visible = true
    this.dialogTree = dialogue(name)
    this.currNode = this.dialogTree.next()
    this.display(this.currNode.value)
  }

  respond (index) {
    this.currNode = this.dialogTree.next(index)
    if (this.currNode.done) {
      this.visible = false
      this.dialogTree = null
      this.game.paused = false
    } else {
      this.display(this.currNode.value)
    }
  }

  display (value) {
    this.setOtherText(this.currNode.value.line)
    this.setPlayerText(this.currNode.value.choices)
  }

  setPlayerText (text) {
    // out with the old
    if (this.textBoxes) {
      for (let i = 0; i < this.textBoxes.length; i++) {
        this.removeChild(this.textBoxes[i])
        this.textBoxes[i].destroy()
      }
    }
    // in with the new
    for (let i = 0; i < text.length; i++) {
      this.textBoxes[i] = new TextBox({
        game: this.game,
        x: 50,
        y: 50 + i * 120,
        text: text[i],
        style: this.style,
        i: i
      })
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
    this.otherBox = new TextBox({
      game: this.game,
      x: 450,
      y: 50,
      text: text,
      style: this.style,
      i: -1
    })
    this.addChild(this.otherBox)
  }

  update () {}
}
