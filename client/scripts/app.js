

var updateFeed = function(data){
  $(".feed p").remove();

  var response = data.results;
  // console.log("this is the data, ", data)
  var i = (response.length > 9) ? 9 : response.length-1;
  // console.log("this is response ", response)
  while (i >= 0){
    var message = response[i];
    var username = message.username;
    message.text = _.escape(message.text);
    if (_.contains(app.friends, username)){
      $(".feed").append('<p><button type="button" class="btn btn-link friend" style="padding-right: 2px"><b>' + message.username + "</b></button>: <b>" + message.text + '</b> <abbr class="timeago" style="color:#FFBA66;font-size:12px" title="'+ message.createdAt + '">'+ new Date(message.createdAt)+ '</abbr></p>');
      i--;
    } else {
    $(".feed").append('<p><button type="button" class="btn btn-link friend" style="padding-right: 2px">' + message.username + "</button>: " + message.text + '  <abbr class="timeago" style="color:#FFBA66;font-size:12px" title="'+ message.createdAt + '">'+ new Date(message.createdAt)+ '</abbr></p>');
      i--;
    }

  }
  $("abbr.timeago").timeago();
};
// <button type="button" class="btn btn-link">Link</button>

var getRooms = function(data){
  var responseArray = data.results;
  var room = {};
  // console.log("responsearray, ", responseArray);
  for (var i = 0; i < responseArray.length; i ++){
    var chatroom = _.escape(responseArray[i].roomname);

    if (chatroom && chatroom === responseArray[i].roomname){
      room[chatroom] = chatroom;
    }
  }
  console.log("room obj: ", room)
  var uniqueRooms = Object.keys(room);
  for (var j =0; j < uniqueRooms.length; j ++ ){
    $(".chatrooms").append('<button type="button" class="btn btn-info available-rooms">' + uniqueRooms[j] + "</button>");
  }
};




var App = function(){
  this.gotRoom = false;
  this.server = 'http://localhost:3000/classes/';
  this.roomname = "Lobby";
  this.friends = {};
};



App.prototype.init = function(){
  var lobbyQuery = {order: "-createdAt", where: {roomname: "Lobby"}};
  this.fetch(lobbyQuery, updateFeed);
  var roomQuery = {order: '-createdAt'};
  this.fetch(roomQuery, getRooms);
  // this.url =
};

//CHANGE THIS LATER!!!
//var room = ... || "lobby"
// var queryConstraint = {order: '-createdAt', where: {roomname: room}} || "order=-createdAt";




App.prototype.fetch = function(queryConstraint, callback){
  $.ajax({
      // always use this url
      url: this.server,
      type: 'GET',
      dataType: 'json',
      data: queryConstraint,
      success: function (data) {
        callback(data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to receive message');
      }
  });
};

App.prototype.send = function(message){
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};


// App.prototype.clearMessages = function(){
//   $('#chats').
// }

var queryConstraint;
var app = new App();
$(document).ready(function(){

  app.init();

  queryConstraint = {order:"-createdAt", where:{roomname: app.roomname}};
  var username = window.location.search.slice(10);
  var message = {
    "username": username,
    "roomname": "Lobby"
  };

  $(".chatrooms").on('click', ".available-rooms",function(){
    app.roomname = $(this).text();
    message.roomname = app.roomname;
    queryConstraint = {order:"-createdAt", where:{roomname: app.roomname}};
    app.fetch(queryConstraint, updateFeed);
    $('h2').text("Current Chatroom: " + app.roomname)
  });


  //adds friend to friend list
  $(".feed").on('click', ".friend",function(){
    var friendChosen = $(this).text();
    if (!app.friends[friendChosen]){
      $(".friends-list").append('<button class="btn btn-default removeFriend">' + friendChosen + '<span class="glyphicon glyphicon-remove" style="opacity:0;"></span>' + '</button>');
      app.friends[friendChosen] = friendChosen;
   }
    console.log("friend list", app.friends);
  });


  //remove friend when glyicon is clicked
  $(".friends-list").on('click', ".removeFriend",function(){
    var friendChosen = $(this).text();
    if (app.friends[friendChosen]){
      delete app.friends[friendChosen];
      var removeThis = $(this);
      removeThis.remove();
    }
  });

  //
  $(".friends-list").on('mouseenter', ".removeFriend",function(){
    // var friendChosen = $(this).text();
    $(this).children().css("opacity", "1");
    console.log(this);
    $(this).on('mouseleave', function(){
      $(this).children().css("opacity", "0");
    });

    // removeThis.remove();
    // app.friends[friendChosen] = null;
    console.log("friend list", app.friends);
  });



  $(".message-submit").click(function(){
      var text = $(".messagebox").val();
      message["text"] = text;
      message["createdAt"] = new Date();
      message.roomname = app.roomname;
      app.send(message);
      $(".messagebox").val("");
      setTimeout(function(){
        app.fetch(queryConstraint, updateFeed);
      }, 500);
  });

  $(".messagebox").keypress(function(e){
    var key = e.which;
    if(key === 13){
      var text = $(".messagebox").val();
      message["text"] = text;
      app.send(message);
      $(".messagebox").val("");
      setTimeout(function(){
        app.fetch(queryConstraint, updateFeed);
      }, 500);
    }
  });

});


