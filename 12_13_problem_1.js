const fs = require('fs');

let filePath = './input.txt';
let filePathTest = './test.txt';
let input = fs.readFileSync(filePath, 'utf8').split('\n\n').map(str => str.split('\n'));
input = input.map(strArr => strArr.map(str => str.split('')))
let test = fs.readFileSync(filePathTest, 'utf8').split('\n\n').map(str => str.split('\n'));
test = test.map(strArr => strArr.map(str => str.split('')))
/*
P: Find either the vertical or horizontal mirror point


Algo:
  iterate through the array horizontally =
  start @ row at index position 1.
  go until row at length - 3
  see if character in string is equal to same char in string at index --- HELPER
    if no, continue loop
    if yes
      find the remaing paired indices --- HELPER
      check to see if these are mirrors
      if yes, return (index + 1) * 100
      if no continue loop
  if no horizontal match from 1 to length of first string - 3
    for each string in arr, check to see if i and i + 1 matches
      if no, continue loop
      if yes
        find the remaing paired indices --- HELPER
        check to see if these are mirrors
        if yes, return (index + 1)
        if no continue loop

*/


let sumNotes = function(patterns) {
  return patterns.reduce((sum, pattern) => {
    sum += horizontalMatchSum(pattern);
    sum += veritcalMatchSum(pattern);
    // console.log(veritcalMatchSum(pattern), patterns.indexOf(pattern))
    // console.log(horizontalMatchSum(pattern), patterns.indexOf(pattern))

    console.log(sum)
    return sum;
  }, 0)
}

let horizontalMatchSum = function(pattern) {
  for (let i = 0; i < pattern.length - 1; i++) {
    if (patternsMatch(pattern[i], pattern[i + 1]) ){
      let remainingIs = findIs(i, pattern.length)
      if (remainingIs.length === 0) {
        return ((i + 1) * 100);
      } else if (remainingIs.every(pair => patternsMatch(pattern[pair[0]], pattern[pair[1]]))) {
        return ((i + 1) * 100);
      }
    }
  }
  return 0;
}

let veritcalMatchSum = function(pattern) {
  for (let i = 0; i < pattern[0].length - 1; i++) {
    if (patternsMatch(verticalPattern(pattern, i), verticalPattern(pattern, i + 1))) {
      let remainingIs = findIs(i, pattern[0].length)
      if (remainingIs.length === 0) {
        return i + 1
      } else if (remainingIs.every(pair => patternsMatch(verticalPattern(pattern, pair[0]), verticalPattern(pattern, pair[1])))) {
        return i + 1;
      }
    }
  }
  return 0;
}

let verticalPattern = function(pattern, i) {
  let newArr = [];
  pattern.forEach(line => {
    if (line[i] === undefined) {
      console.log('false')
    }
    newArr.push(line[i])
  })
  return newArr;
}



let patternsMatch = function(pattern1, pattern2) {
  // console.log(pattern1, pattern2)
  return pattern1.every((char, i) => char === pattern2[i])
}

let findIs = function(i, patternLength) {
  let iPairs = [];
  let upper = i + 2;
  i -= 1;
  while (i >= 0 && upper <= patternLength - 1) {
    iPairs.push([i, upper]);
    i -= 1;
    upper += 1;
  }
  return iPairs;
}


// let balls = '#...##..#\n' +
// '#....#..#\n' +
// '..##..###\n' +
// '#####.##.\n' +
// '#####.##.\n' +
// '..##..###\n' +
// '#....#..#'

// balls = balls.split('\n')
// balls = balls.map(str => str.split(''));
// // console.log(balls)

console.log(sumNotes(input))
