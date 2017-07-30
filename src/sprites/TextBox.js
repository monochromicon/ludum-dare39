import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor({ game, x, y, text, style, i }) {
    super(game, x, y, 'textbox')
    this.game = game
    // this.text = new Text({
    //   game:game,
    //   x:x,
    //   y:y,
    //   text:text,
    //   style:style
    // })
    this.i = i
    this.text = this.game.add.text(12, 12, text, style)
    this.addChild(this.text)

    // negative index used for noninteractable box
    if (i >= 0) {
      this.inputEnabled = true
      this.useHandCursor = true
      this.events.onInputDown.add(this.textClicked, this)
      this.events.onInputOver.add(this.textHover, this)
      this.events.onInputOut.add(this.textUnhover, this)
    }
  }

  textClicked() {
    this.game.convo.respond(this.i)
  }

  textHover() {
    this.tint = 0xaaaaaa
  }

  textUnhover() {
    this.tint = 0xffffff
  }
}
