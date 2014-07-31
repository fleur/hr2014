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
  var solutionCount = 0;
  var result = [];
  var size = n;

  var board = new Board({n:n});

  var process = function(rooksToGo) {
    var x = rooksToGo-1;

    // base case, we've placed all our rooks
    if ((rooksToGo === 0) || (solutionCount >= 0)) {

      solutionCount++;

      // // we found a board with all n rooks placed
      for(var i = 0; i < size; i++){
        result.push([]);
        for(var j = 0; j < size; j++){
          result[i].push(board.get(i)[j]);
        }
      }
      return;
    }

//    for (var y = 0; y < size; y++) {

      // place rook in a position
      board.get(x)[0] = 1;

      // check that when we placed the rook there are no conflicts
      if (board.hasRowConflictAt(x) || board.hasColConflictAt(0)) {

        // if there was a conflict with
        // the rook we place, unset it
        board.get(x)[0] = 0;

      } else {

        // successfully placed a rook
        process(rooksToGo - 1);
        board.get(x)[0] = 0;
      }
    }
  //}
  process(n);

  return result;
};



// return the number of nxn chessboards that exist,
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
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
  var solutionCount = 0;
  var result = [];
  var size = n;

  var board = new Board({n:n});

  var process = function(rooksToGo) {
    var x = rooksToGo-1;

    // base case, we've placed all our rooks
    if ((rooksToGo === 0) || (solutionCount >= 0)) {

      solutionCount++;

      // // we found a board with all n rooks placed
      for(var i = 0; i < size; i++){
        result.push([]);
        for(var j = 0; j < size; j++){
          result[i].push(board.get(i)[j]);
        }
      }
      return;
    }

//    for (var y = 0; y < size; y++) {

      // place rook in a position
      board.get(x)[0] = 1;

      // check that when we placed the rook there are no conflicts
      if (board.hasRowConflictAt(x) ||
          board.hasColConflictAt(0) ||
          board.hasAnyMinorDiagonalConflicts() ||
          board.hasAnyMajorDiagonalConflicts() ){

        // if there was a conflict with
        // the rook we place, unset it
        board.get(x)[0] = 0;

      } else {

        // successfully placed a rook
        process(rooksToGo - 1);
        board.get(x)[0] = 0;
      }
    }
  //}
  process(n);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));

  return result;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
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
      if (board.hasAnyColConflicts() ||
          board.hasAnyRowConflicts() ||
          board.hasAnyMinorDiagonalConflicts() ||
          board.hasAnyMajorDiagonalConflicts() ) {

        // if there was a conflict with
        // the queen we place, unset it
        board.get(x)[y] = 0;

      } else {

        // successfully placed a queen
        process(rooksToGo - 1);
        board.get(x)[y] = 0;
      }
    }
  };


  process(n);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
