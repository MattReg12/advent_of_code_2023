const fs = require('fs');

const filePath = './input.txt';

let data = fs.readFileSync(filePath, 'utf8')

let input = data.split('\n').map(str => str.split(' ')).map(arr => {
  let obj = new Object()
  obj['cards'] = arr[0];
  obj['bet'] = +arr[1];
  return obj
})
input.pop()
const CARD_RANKS = {A: 13, K: 12, Q: 11, J: 0, T: 9, 9: 8, 8: 7, 7: 6, 6: 5, 5: 4, 4: 3, 3: 2, 2: 1};
const HAND_RANKS = {'FiveOfAKind': 7, 'FourOfAKind': 6, 'FullHouse': 5, 'ThreeOfAKind': 4, 'TwoPair': 3, 'OnePair': 2, 'HighCard': 1}

// let handType = function(hand) {
//   let fiveOfAKindRegex = /(.)\1{4}/;
//   let fourOfAKindRegex = /(.)(.*\1){3}/;
//   let threeOfAKindRegex = /(.)(.*\1){2}/;
//   let twoPairRegex = /(.)(/;
//   let onePairRegex = /(.)(.*\1){1}/;

// }

let jackalize = function(cardCount) {
  if (!Object.keys(cardCount).includes('J')) return cardCount
  let copy = {...cardCount};
  let jS = copy['J'];
  delete copy['J']
  let highest = Object.entries(copy).sort((a, b) => {
    let comparison = a[1] - b[1];
    if (comparison === 0) {
      return CARD_RANKS[a[0]] - CARD_RANKS[b[0]]
    }
    return comparison
  })
  highest = highest[highest.length - 1] || 5;

  copy[highest[0] || 'A'] += jS;
  return copy
}

input.forEach(hand => {
  hand['cardCount'] = {};
  for (card of hand['cards']) {
    hand['cardCount'][card] = hand['cardCount'][card] || 0;
    hand['cardCount'][card] += 1
  }
  hand['jackCardCount'] = jackalize(hand['cardCount']);
})


let rank = function(hand) {
  let values = Object.values(hand['jackCardCount']);
  switch (true) {
    case (values.length === 1):
      return 7;
    case (values.some(count => count === 4)):
      return 6;
    case (values.length === 2):
      return 5;
    case (values.some(count => count === 3)):
      return 4;
    case (values.length === 3):
      return 3;
    case (values.length === 4):
      return 2;
    default:
      return 1;
  }
}

input.forEach(hand => {
  hand['handRank'] = rank(hand);
})

let higherHand = function(hand1, hand2) {
  for (let i = 0; i < hand1.length; i++) {
    if (CARD_RANKS[hand1[i]] > CARD_RANKS[hand2[i]]) return 1;
    if (CARD_RANKS[hand1[i]] < CARD_RANKS[hand2[i]]) return -1;
  }

  return 0;
}

input.sort((a, b) => {
  let comparison1 = a['handRank'] - b['handRank'];
  if (comparison1 === 0) {
    return higherHand(a['cards'], b['cards']);
  }

  return a['handRank'] - b['handRank'];
})

let sum = 0;
for (let i = 0; i < input.length; i++) {
  sum += (i + 1) * input[i]['bet'];
}

console.log(sum);
