let input = [{time: 55826490, distance: 246144110121111}]

let productOfWinningCombos = function(timeDistanceCombos) {
  return product(winningComboCount(timeDistanceCombo))
}

let product = function(numArray) {
  return numArray.reduce((prod, num) => prod *= num, 1)
}

let winningComboCount = function(combos) {
  return combos.map(combo => {
    let variations = timeDistanceVariations(combo);
    variations = variations.filter(variation => variation['distance'] > combo['distance']);
    return variations.length
  })
}

let timeDistanceVariations = function(combo) {
  let variations = [];
  for (let i = 1; i <= combo['time']; i++) {
    variations.push({speed: i, distance: (combo['time'] - i) * i})
  }

  return variations;
}

console.log(product(winningComboCount(input)))
