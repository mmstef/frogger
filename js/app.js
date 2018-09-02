// Begin with two enemies
allEnemies = [new Enemy(), new Enemy()];
gems = [];
player = new Player();
game = new Game();

// Create new enemies every second if needed (max 6 onscreen at any time)
setInterval(function() {
  if (allEnemies.length < 6 && game.running) {
    allEnemies.push(new Enemy());
  }
}, 1000);


// Create a new gem at random
setInterval(function() {
  if (gems.length == 0 && game.running && parseInt(Math.random() * 10) == 5) {
    gems.push(new Gem());
  }
}, 1000);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
