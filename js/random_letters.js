/* For larger requests, we could do something simpler, like:
 * 1. letter frequency * request (round up for decimals)
 * 2. shuffle
 * 3. slice array from 0-n to drop any extras
 * eg. n = 100: a = Math.ceiling(1000*0.08167) = 87, b = Math.ceiling(1000*0.01492) = 15... z = Math.ceiling(1000*0.00074) = 1
 *
 * This will feel slightly less random, and won't work for requests where n <= 675, because we would never get the letter z
*/

var letters = [];
var sum = 0;
var numToLetter = {};
var letterFreq = {
  a: 8.167,
  b: 1.492,
  c: 2.782,
  d: 4.253,
  e: 12.702,
  f: 2.228,
  g: 2.015,
  h: 6.094,
  i: 6.966,
  j: 0.153,
  k: 0.772,
  l: 4.025,
  m: 2.406,
  n: 6.749,
  o: 7.507,
  p: 1.929,
  q: 0.095,
  r: 5.987,
  s: 6.327,
  t: 9.056,
  u: 2.758,
  v: 0.978,
  w: 2.361,
  x: 0.150,
  y: 1.974,
  z: 0.074
};

Object.keys(letterFreq).map(function(key, i) {
  sum += letterFreq[key];
  numToLetter[key] = sum;
});


var nums = Object.keys(numToLetter).map(function(key, i) {
  return numToLetter[key];
});

var alphabet = Object.keys(numToLetter).map(function(key, i) {
  return key;
});

var binaryIndexOf = function(searchElement) {
  var index;
  var i = 0;

  while (!index) {
    if (searchElement < nums[i]) {
      index = i;
      break;
    }
    i++;
  }

  return index;
};

var getRandomLetterValue = function() {
  return (Math.random() * 100).toFixed(4);
};

var convertValueToLetter = function(value) {
  var index = binaryIndexOf(value);
  return alphabet[index];
};

var getRandomLetters = function(count) {
  var letters = [];
  for (var i = 0; i < count; i++) {
    var value = getRandomLetterValue();
    letters.push(convertValueToLetter(value));
  }
  return letters;
};