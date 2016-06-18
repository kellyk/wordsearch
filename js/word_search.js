var dictionary;

var loadDictionary = function() {
  $.ajax({
    url: '../data/20k.txt',
    success: function(data) {
      dictionary = data.split('\n').filter(function(word) {
        return word.length >= 3;
      });
    }
  });
};

var buildGrid = function() {
  var letters = getRandomLetters(144);
  var $board = $('.board');
  var $grid = $('<div></div>');
  letters.forEach(function(letter, i) {
    $grid.append('<span class="letter">' + letters[i] + '</span>');

    if ((i+1)%12 === 0) {
      $grid.append('<br />');
    }
  });

  $board.html($grid);
};

var start = function() {
  loadDictionary();

  $('.new-game').on('click', buildGrid);
};


$(document).ready(start);