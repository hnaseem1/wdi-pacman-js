// Setup initial game stats
var score = 0;
var lives = 2;
var powerPallets = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orage',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde]


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}
function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1
    return console.log(' '+ghost.colour + ' ' + ghost.name + ' Killed pacman');
  }

}
function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives+'     Power Pallets: ' + powerPallets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPallets > 0) {
    console.log('(p) Eat Power-Pallet');
  }
  console.log('(1) Inky');
  console.log('(2) Blinky');
  console.log('(3) Pinky');
  console.log('(4) Clyde');
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

function eatPowerPallet() {
  score += 50
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true
  }
  powerPallets -= 1
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
    if (powerPallets > 0) {
        eatPowerPallet();
    } else {
      console.log('    No Power Pallets');
    }
      break;
    case '1':
      eatGhost(ghosts[0]);
      livesBelowZero();
      break;
    case '2':
      eatGhost(ghosts[1]);
      livesBelowZero();
      break;
    case '3':
      eatGhost(ghosts[2]);
      livesBelowZero();
      break;
    case '4':
      eatGhost(ghosts[3]);
      livesBelowZero();2
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

function livesBelowZero() {
  if (lives <= 0) {
    process.exit()
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
