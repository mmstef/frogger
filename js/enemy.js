// Enemies our player must avoid
var Enemy = function() {
  // Current row can be between 1 and 3
  this.current_row = 1 + parseInt(Math.random() * 100) % 3;
  this.y = (this.current_row * TILE_HEIGHT) - 20;

  this.x = -TILE_WIDTH;
  // Min speed is 80, max speed is 260
  this.x_speed = 80 + parseInt(Math.random() * 180);

  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.x_speed * dt * game.speed_factor;

  // Should we self destruct?
  if (this.x > 600) {
    // Remove ourselves from the allEnemies array
    allEnemies.splice(allEnemies.indexOf(this), 1);

    // Create a new enemy in our place
    allEnemies.push(new Enemy());
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
