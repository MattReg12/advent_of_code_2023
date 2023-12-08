let input = {time: 55826490, distance: 246144110121111};

/* just found the first one, then reversed for loop and found last one, then subtracted  */

let timeDistanceVariations = function(combo) {
  let variations = [];
  for (let i = combo['time']; i >= 1; i -= 1) {
    let tempDistance = (combo['time'] - i) * i;
    if (tempDistance > combo['distance']) {
      variations.push({speed: i, distance: tempDistance})
      break
    }
  }

  return variations[0]
}

// { speed: 4826341, distance: 246144110124809 }
// { speed: 51000149, distance: 246144110124809 }

console.log(timeDistanceVariations(input))

