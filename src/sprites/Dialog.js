import Phaser from 'phaser'
import Orb from '../sprites/Orb'
import TextBox from '../sprites/TextBox'
import { dialogue } from '../utils'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'shroud')
    this.game = game
    this.textBoxes = []
    this.otherBox = null
    this.style = {
      font: '12pt Arial',
      fill: '#ffffff',
      wordWrap: true,
      wordWrapWidth: 276
    }
    this.orb = new Orb({ game: game, x: 54, y: 600 })
    this.addChild(this.orb)
    this.dialogTree = null
    this.currNode = null
    this.visible = false
    this.currentTimer = null
    this.nextIndex = -1
    this.currValue = null
    this.dead = false
    var key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    key.onDown.add(this.skipDialog, this)
    key = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)
    key.onDown.add(this.skipDialog, this)
  }

  startConvo (name) {
    this.visible = true
    this.dialogTree = dialogue(name)
    this.currNode = this.dialogTree.next()
    this.display(this.currNode.value, 0)
  }

  respond (index) {
    if (this.dead) {
      // You are dead, phase two
      this.game.player.alpha = 0
      this.visible = false
      this.deathtext.destroy()
      this.game.add.text(340, 130, 'The End', {
        font: '24pt Arial',
        fill: '#000000'
      })
      this.game.state.getCurrentState().die()
      return
    }
    if (this.orb.drain(1)) {
      this.currNode = this.dialogTree.next(index)
      if (this.currNode.done) {
        this.visible = false
        this.dialogTree = null
        this.game.paused = false
      } else {
        this.display(this.currNode.value, 0)
      }
    } else {
      // You are dead, phase one
      this.dead = true
      this.tint = 0x552222
      this.game.player.alpha = 0.20
      this.deathtext = this.game.add.text(
        150,
        520,
        'Your time is up. Choose your last words.',
        {
          font: '24pt Arial',
          fill: '#ffffff'
        }
      )
      this.otherBox.destroy()
      this.setPlayerText([
        "I'm sorry, I have to go now. Take care, and live well.",
        'Thank you for everything. Life was pretty good here.',
        'Just remember me when you see the setting sun.'
      ])
    }
  }

  display (value, index) {
    if (!Array.isArray(value.line)) {
      value.line = [value.line]
    }
    if (index < value.line.length) {
      this.setOtherText(value.line[index])
      this.setPlayerText([])
      this.currentTimer = setTimeout(() => {
        this.display(value, index + 1)
      }, 2500)
      this.nextIndex = index + 1
      this.currValue = value
    } else {
      this.setOtherText(value.line[index - 1])
      this.setPlayerText(value.choices)
    }
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

  skipDialog () {
    if (this.currentTimer) {
      clearTimeout(this.currentTimer)
      this.currentTimer = null
      this.display(this.currValue, this.nextIndex)
    }
  }

  update () {
    // console.log('dialog got updated')
    // this.orb.update()
  }
}
