// Gems to collect
var Gem = function() {
    this.current_row = 1 + parseInt(Math.random() * 100) % 3
    this.current_column = parseInt(Math.random() * 100) % 5

    this.x = this.current_column * TILE_WIDTH;
    this.y = (this.current_row * TILE_HEIGHT) - 20;

    const powerup_types = ["slow_motion", "1up", "clear_enemies"];

    this.powerup_type = powerup_types[parseInt(Math.random() * 10) % 3]

    if (this.powerup_type == "slow_motion") {
      this.sprite = 'images/gem-blue.png';
    } else if (this.powerup_type == "1up") {
      this.sprite = 'images/Heart.png'
    } else if (this.powerup_type == "clear_enemies") {
      this.sprite = 'images/gem-orange.png'
    }
};

// Draw the Gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function() {
  // Should we be used?
  if (player.current_row == this.current_row && player.current_column == this.current_column) {
    gems = []
    this.use()
  }
};

Gem.prototype.use = function() {

  if (this.powerup_type == "slow_motion") {
    game.start_slow_motion()
  } else if (this.powerup_type == "1up") {
    game.lives++;
  } else if (this.powerup_type == "clear_enemies") {
    allEnemies = []
  }
}
