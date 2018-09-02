// Create a game object
var Game = function() {
  this.lives = 3;
  this.points = 0;
  this.running = true;
  this.speed_factor = 1;
  this.over = false;
  this.slow_motion_time_left = -1;
}

Game.prototype.start_slow_motion = function() {
  // If we are already running in slow motion, just reset the time to 4 seconds
  if (this.slow_motion_time_left >= 0) {
    this.slow_motion_time_left = 4;
  } else {
    this.speed_factor = 0.2;
    this.slow_motion_time_left = 4;
    setTimeout(function() {
      game.count_down();
    }, 1000);
  }
}

Game.prototype.count_down = function() {
  if (this.slow_motion_time_left > 0) {
    this.slow_motion_time_left--;
    setTimeout(function() {
      game.count_down();
    }, 1000);
  } else {
    game.stop_slow_motion();
  }
}

Game.prototype.stop_slow_motion = function() {
  this.speed_factor = 1;
  this.slow_motion_time_left = -1;
}

Game.prototype.died = function() {
  this.lives -= 1;

  if (this.lives < 0) {
    this.over = true;
    this.running = false;
  }
}

Game.prototype.render = function() {

  if (this.slow_motion_time_left >= 0) {
    ctx.fillStyle = "#fff";
    ctx.font = "28px sans-serif";
    ctx.fillText(this.slow_motion_time_left, 460, 575);
  }

  if (this.over) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 50, 505, 536);

    ctx.fillStyle = "#fff";
    ctx.font = "56px sans-serif";
    ctx.fillText(`GAME OVER`, 81, 200);

    ctx.font = "42px sans-serif";
    ctx.fillText(`Score: ${this.points}`, 160, 260);

  } else {
    ctx.fillStyle = "#fff";
    ctx.font = "28px sans-serif";
    ctx.fillText(`Lives: ${this.lives} - Score: ${this.points}`, 10, 575);
  }
}
