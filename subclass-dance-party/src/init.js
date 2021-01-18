$(document).ready(function(){
  window.dancers = [];

  $("body").on("mouseover", '.subtledancer', function(event){
    console.log(this);
    var x = $(this).css("left");
    var y = parseInt($(this).css("top")) + 30;
    var x2 = parseInt(x) + 200;
    console.log(parseInt(x));
    console.log(x,y);
    $(this).css("left", 200.000000001);
    $(this).css("top", y);


  });

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      Math.round($("body").height() * Math.random()),
      Math.round($("body").width() * Math.random()),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);

    var myPos = dancer.getPosition();
    for (var i=0; i<window.dancers.length; i++) {
      var pos = window.dancers[i].getPosition();
      var partial = Math.pow(Math.abs(myPos[0]-pos[0]), 2) +
                    Math.pow(Math.abs(myPos[1]-pos[1]), 2);
      var distance = Math.sqrt(partial);
       if (distance < 500) {
        setTimeout(dancer.lineup.bind(dancer), 2000);
       }
    }

    window.dancers.push(dancer);
  });
});

