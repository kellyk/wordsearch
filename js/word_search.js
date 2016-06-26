var WordSearchTetris = (function() {
  var wordSearchTetris = {};

  // Private variables
  var size = 12;
  var dictionary;
  var letters = [];
  var possibleWords = [];
  var $board = $('.board');
  var $words = $('.words');
  var $wordList = $('.word-list');

  var mustUseWords = [
    'strawberry',
    'blueberry',
    'watermelon',
    'lemonade',
    'hotdog',
    'barbeque',
    'popsicle'
  ];

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
  var directions = [north, northeast, east, southeast, south, southwest, west, northwest];

  // Private methods
  function randomNumber(min, max) {
    return Math.floor( Math.random() * ( 1 + max - min ) ) + min;
  }

  function loadDictionary() {
    $.ajax({
      url: '../data/1k.txt',
      success: function(data) {
        dictionary = data.split('\n').filter(function(word) {
          return word.length >= 3;
        });
      }
    });
  }

  function north(i, j) {
    // north (decrement i, constant j)
    var currentLetters = '';

    for (i; i >= 0; i--) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function northeast(i, j) {
    // northeast (decrement i, increment j)
    var currentLetters = '';

    for (i, j; i >= 0 && j < size; i--, j++) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function east(i, j) {
    // east (constant i, increment j)
    var currentLetters = '';

    for (j; j < size; j++) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function southeast(i, j) {
    // southeast (increment i, increment j)
    var currentLetters = '';

    for (i,j; i < size && j < size; i++, j++) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function south(i, j) {
    // south (increment i, constant j)
    var currentLetters = '';

    for (i; i < size; i++) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }

  }

  function southwest(i, j) {
    // southwest (increment i, decrement j)
    var currentLetters = '';

    for (i,j; i < size && j >= 0; i++, j--) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function west(i, j) {
    // west (constant i, decrement j)
    var currentLetters = '';

    for (j; j >= 0; j--) {
      currentLetters += letters[i][j];
      if (currentLetters.length > 2) {
         possibleWords.push(currentLetters);
      }
    }
  }

  function northwest(i, j) {
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
    return $.unique(possibleWords).filter(function(word, idx) {
      return dictionary.indexOf(word) >= 0;
    });
  }

  function findCurrentWords() {
    for (var i=0, j=0; i < size && j < size; i++, j++) {
      directions.forEach(function(direction, idx) {
        direction.call(this, i,j);
      });
    }
  }

  function displayCurrentWords() {
    var actualWords = getActualWords();
    $words.show();
    $wordList.html(actualWords.join('<br>'));
  }

  function getRandomPosition(word) {
    var randomDirection = directions[randomNumber(0, directions.length-1)].name;
    var randomRow = randomNumber(0, size-1);
    var randomCol = randomNumber(0, size-1);
    console.log("direction", randomDirection);
    console.log("row", randomRow);
    console.log("col", randomCol);
    return true;

  }

  function findSpaceForWord() {

  }

  function addMustUseWords() {
    mustUseWords.forEach(function(word, idx) {
      var spaceFound = false;
      while (!spaceFound) {
        spaceFound = findSpaceForWord(word);
      }
    });
  }

  function buildGrid(size) {
    var $grid = $('<div></div>');
    for (var i = 0; i < size; i++) {
      letters.push(getRandomLetters(size));
    }

    addMustUseWords();

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