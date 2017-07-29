import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5, 1.0)
    this.inputEnabled = true;
  }

  interact() {
    // Talk
  }

  update () {
    var left = game.input.keyboard.isDown(Phaser.KeyCode.LEFT)
    var right = game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)
    var space = game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)
    if( space ){
      interact();
    }
    if( left && !right ) {
      this.x -= 4;
    }
    if ( right && !left ) {
      this.x += 4;
    }
  }
}
