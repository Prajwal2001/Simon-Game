var randomNumber;
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var userClickedPattern = [];
var hasGameStarted = false;
var level = 0;
var i = -1;
function nextSequence() {
  randomNumber = Math.round(Math.random() * 3);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("level " + level);
}
$("#start-button").click(function() {
  if (!hasGameStarted) {
    $("#level-title").text("level " + (level));
    nextSequence();
    hasGameStarted = true;
    $("#start-button").hide();
  }
});
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  i++;
  console.log(userClickedPattern.length + " " + gamePattern.length);
  checkPattern(userClickedPattern.length - 1);
  if(userClickedPattern.length == gamePattern.length && userClickedPattern.length > 0){
    console.log(userClickedPattern);
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
    i = 0;
  }
});
function playSound(name) {
  var x = new Audio("./sounds/" + name + ".mp3");
  x.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function checkPattern(colourName) {
  for(var j = 0; j < userClickedPattern.length; j++){
    if(gamePattern[j] != userClickedPattern[j]){
      console.log("Wrong pattern " + userClickedPattern[j]);
      onWrongPattern();
    }
  }
}
function onWrongPattern() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Game Over, click start button to Restart");
  hasGameStarted = false;
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  $("#start-button").show();
}