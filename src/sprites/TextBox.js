import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, text, style, i }) {
    super(game, x, y, 'textbox')
    this.addChild(new Text(game, x, y, text, style))
    
    // negative index used for noninteractable box
    if (i >= 0) {
      this.inputEnabled = true
      this.useHandCursor = true
      this.events.onInputDown.add(textClicked, i)
    }
  }

  textClicked (index) {
    //TODO
  }

  update () {
  }
}
