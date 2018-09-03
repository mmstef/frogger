var Player = function() {
  // Player starts in the middle of the bottom row
  this.current_column = 2;
  this.current_row = 5;
 
  this.x = 0;
  this.y = 0;
  this.waiting_for_reset = false;

  this.sprite = 'images/char-boy.png';
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
  // If we have reached the water and are not waiting to be reset to the bottom row
  if (this.current_row === 0 && !this.waiting_for_reset) {
    // Mark that we are waiting to be reset to the bottom row
    this.waiting_for_reset = true;

    
    self = this;

    // Give the player 200ms to appreciate the fact that he reached the water
    setTimeout(function() {
      game.points++;
      self.reset();
      self.waiting_for_reset = false;
    }, 200);
  }

  // Set our coordinates
  this.x = this.current_column * TILE_WIDTH;
  this.y = (this.current_row * TILE_HEIGHT) - 20;
}

// Move our character
Player.prototype.handleInput = function(key) {
  if (this.waiting_for_reset) {
    return false;
  }

  if (key === "up") {
    if (this.current_row > 0) this.current_row -= 1;
  } else if (key === "down") {
    if (this.current_row < 5) this.current_row += 1;
  } else if (key === "left") {
    if (this.current_column > 0) this.current_column -= 1;
  } else if (key === "right") {
    if (this.current_column < 4) this.current_column += 1;
  }
}

// Reset our player to the middle of the bottom row
Player.prototype.reset = function() {
  this.current_row = 5;
  this.current_column = 2;
}

// This is our collision detection
Player.prototype.intersects = function (enemy) {
  // First, work out the exact coordinates of our player model and enemy model
  // (we only need the X axis since we are only worried about our current row)
  let player_sides = {left: this.x + 18, right: this.x + 18 + 66};
  let enemy_sides = {left: enemy.x, right: enemy.x + TILE_WIDTH};

  // If the left side of the player is BETWEEN the enemies right and left sides then it intersects
  // OR
  // If the right side of the player is BETWEEN the enemies left and right sides then it intersects
  return (player_sides.left >= enemy_sides.left && player_sides.left <= enemy_sides.right) || (player_sides.right >= enemy_sides.left && player_sides.right <= enemy_sides.right);
}
