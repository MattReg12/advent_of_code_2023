/*

P: Determine which tiles of a grid are engerized.

A beam has 2 pieces of data associated with it. It has a coordinate and direction its heading.
a beam traverse a grid going its direction until it reaches the end of the grid or encounters
an obstacle.

There are 4 obstacles
 / \ | -

The beam reacts differently depending on which direction its headed.

Algorithm:

Create a direction change constants
right:  \  = down, | = down, / = up, - = right
left:  \  = up, | = down, / = down - = left
up:  \  = left, | = up , / = right, - = left
down:  \  = right, | = down, / = left, - = left

down and left to be reassigned new beams via helper method addNewBeam

i/d an energized tiles array
i/d a beam array with below first beam as {0,0 right}

until a beam array empty
  current beam = beamArr[0]
  until beam current coord is undefined
    add current cord to energized tiles
    reassign direction depending on current grid return
      if splitter? (direction, grid return)
        addNewBeam
    reassign current cord depending on direction
  unshift beam array
*/

let test = '.|...\\....\n' +
'|.-.\\.....\n' +
'.....|-...\n' +
'........|.\n' +
'..........\n' +
'.........\\\n' +
'..../.\\\\..\n' +
'.-.-/..|..\n' +
'.|....-|.\\\n' +
'..//.|....'

console.log(test)

test = test.split('\n');
test = test.map(str => str.split(''));

let beams = [{currentCoord: [0, 0], direction: 'right'}];
let energizedTiles = [];

let energize = function(beams, grid) {
  while (beams.length > 0) {
    let beam = beams[0];
    while (beam['direction'] && inBounds(beam['currentCoord'], grid)) {
      console.log(beam)
      energizedTiles.push(beam['currentCoord']);
      let tile = grid[beam['currentCoord'][0]][beam['currentCoord'][1]];
      if (splitter(beam['direction'], tile)) {
        addNewBeam(beam['direction'], beam['currentCoord'])
      }
      console.log(tile)
      if (tile !== '.') {
        beam['direction'] = DIRECTIONS[beam['direction']][tile];
      } else {
        grid[beam['currentCoord'][0]][beam['currentCoord'][1]] = 'X'
      }
      changeCoords(beam);
    }
    console.log(beams)
    beams.shift();
  }
}

const DIRECTIONS = {right: {'\\': 'down', '|': 'down', '/': 'up', '-': 'right' },
                    left: {'\\': 'up', '|': 'down', '/': 'down', '-': 'left' },
                    up: {'\\': 'left', '|': 'up', '/': 'right', '-': 'left' },
                    down: {'\\': 'right', '|': 'down', '/': 'left', '-': 'left' }}


let changeCoords = function(beam) {
  switch (beam['direction']) {
    case 'right':
      beam['currentCoord'] = goRight(beam['currentCoord']);
      break;
    case 'left':
      beam['currentCoord'] = goLeft(beam['currentCoord']);
      break;
    case 'up':
      beam['currentCoord'] = goUp(beam['currentCoord']);
      break;
    case 'down':
      beam['currentCoord'] = goDown(beam['currentCoord']);
      break;
  }
}

let inBounds = function(coord, grid) {
  if (coord.some(num => num < 0)) {
    return false;
  } else if (coord[0] > grid.length - 1) {
    return false;
  } else if (coord[1] > grid[0].length - 1) {
    return false;
  }

  return true;
}


let addNewBeam = function(direction, coord) {
  if (direction === 'left' || direction === 'right') {
    let newCoord = goUp(coord);
    if (newCoord.some(num => num < 0)) return
    beams.push({currentCoord: newCoord, direction: 'up'});
  } else {
    let newCoord = goRight(coord);
    if (newCoord.some(num => num < 0)) return
    beams.push({currentCoord: newCoord, direction: 'right'});
  }
}

let splitter = function(direction, tile) {
  if (direction === 'left' || direction === 'right') {
    if (tile === '|') return true
  } else if (direction === 'up' || direction === 'down') {
    if (tile === '-') return true
  }

  return false;
}

let goUp = function(coord) {
  newCoord = coord.slice();
  newCoord[0] = newCoord[0] -= 1;
  return newCoord;
}

let goDown = function(coord) {
  newCoord = coord.slice();
  newCoord[0] = newCoord[0] += 1;
  return newCoord;
}

let goRight = function(coord) {
  newCoord = coord.slice();
  newCoord[1] = newCoord[1] += 1;
  return newCoord;
}

let goLeft = function(coord) {
  newCoord = coord.slice();
  newCoord[1] = newCoord[1] -= 1;
  return newCoord;
}

energize(beams, test)