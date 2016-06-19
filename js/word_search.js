var WordSearchTetris = (function() {
  var wordSearchTetris = {};

  // Private variables
  var size = 11;
  var dictionary;
  var letters = [];
  var possibleWords = [];
  var actualWords = [];
  var $board = $('.board');
  var $words = $('.words');
  var $wordList = $('.word-list');

  // Private methods
  function loadDictionary() {
    $.ajax({
      url: '../data/20k.txt',
      success: function(data) {
        dictionary = data.split('\n').filter(function(word) {
          return word.length >= 3;
        });
      }
    });
  }

  function northWords(i, j) {
    // north (decrement i, constant j)
    var currentLetters = '';

    for (i; i >= 0; i--) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function northeastWords(i, j) {
    // northeast (decrement i, increment j)
    var currentLetters = '';

    for (i, j; i >= 0 && j < size; i--, j++) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function eastWords(i, j) {
    // east (constant i, increment j)
    var currentLetters = '';

    for (j; j < size; j++) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function southeastWords(i, j) {
    // southeast (increment i, increment j)
    var currentLetters = '';

    for (i,j; i < size && j < size; i++, j++) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function southWords(i, j) {
    // south (increment i, constant j)
    var currentLetters = '';

    for (i; i < size; i++) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }

  }

  function southwestWords(i, j) {
    // southwest (increment i, decrement j)
    var currentLetters = '';

    for (i,j; i < size && j >= 0; i++, j--) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function westWords(i, j) {
    // west (constant i, decrement j)
    var currentLetters = '';

    for (j; j >= 0; j--) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function northwestWords(i, j) {
    // northwest (decrement i, decrement j)
    var currentLetters = '';

    for (i,j; i >= 0 && j >= 0; i--, j--) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function getActualWords() {
    return possibleWords.filter(function(word, idx) {
      return dictionary.indexOf(word) >= 0;
    });
  }

  function findCurrentWords() {

    var i = 5;
    var j = 5;
    northWords(i,j);
    northeastWords(i,j);
    eastWords(i,j);
    southeastWords(i,j);
    southWords(i,j);
    southwestWords(i,j);
    westWords(i,j);
    northwestWords(i,j);

    console.log(possibleWords);
    actualWords = getActualWords();

    /*
    i j   i j   i j   i j
    ----------------------
    0,0   0,1   0,2   0,3
    1,0   1,1   1,2   1,3
    2,0   2,1   2,2   2,3
    3,0   3,1   3,2   3,3

    */
    // from starting point (i, j), look:
    // north (decrement i, constant j)
    // northeast (decrement i, increment j)
    // east (constant i, increment j)
    // southeast (increment i, increment j)
    // south (increment i, constant j)
    // southwest (increment i, decrement j)
    // west (constant i, decrement j)
    // northwest (decrement i, decrement j)
  }

  function displayCurrentWords() {
    $words.show();
    $wordList.html(actualWords.join('<br>'));
  }

  function buildGrid(size) {
    var $grid = $('<div></div>');
    for (var i = 0; i < size; i++) {
      letters.push(getRandomLetters(size));
    }

    letters.forEach(function(row, i) {
      row.forEach(function(letter, j) {
        $grid.append('<span class="letter">' + letter + '</span>');
      });

      $grid.append('<br />');
    });

    $board.html($grid);
  }

  function clearGame() {
    $board.empty();
    $wordList.empty();
    letters = [];
    possibleWords = [];
    actualWords = [];
  }

  function newGame() {
    clearGame();
    buildGrid(size);
    findCurrentWords();
    displayCurrentWords();
  }

  // Public methods
  wordSearchTetris.start = function() {
    loadDictionary();

    $('.new-game').on('click', newGame);
  };

  return wordSearchTetris;

})();


$(document).ready(WordSearchTetris.start);