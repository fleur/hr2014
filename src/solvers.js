/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var size = board.get('n');

  for (var x=0; x<size; x++) {
    for (var y=0; y<size; y++) {
      if (!board.hasRowConflictAt(x) && !board.hasColConflictAt(y)) {
        board.get(x)[y] = 1;
      }
    }
  }

  var rv = [];
  for (var i=0; i<size; i++) {
    rv.push(board.get(i).slice());
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return rv;
};



// return the number of nxn chessboards that exist,
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  //var x = 0;
  //var y = 0;
  var size = n;
  var board = new Board({n:n});

  var process = function(rooksToGo) {
    var x = rooksToGo-1;

    // base case, we've placed all our rooks
    if (rooksToGo === 0) {

      // we found a board with all n rooks placed
      solutionCount++;
      return;
    }


    for (var y = 0; y < size; y++) {

      // place rook in a position
      board.get(x)[y] = 1;

      // check that when we placed the rook there are no conflicts
      if (board.hasRowConflictAt(x) || board.hasColConflictAt(y)) {

        // if there was a conflict with
        // the rook we place, unset it
        board.get(x)[y] = 0;

      } else {

        // successfully placed a rook
        process(rooksToGo - 1);
        board.get(x)[y] = 0;
      }
    }
  };


  process(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
