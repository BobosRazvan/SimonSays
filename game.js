
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[];

var level=1;
var started=false;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Add animation to random colour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    // Increase level
    $("h1").text("Level " + level);

    // Now, let the user try to recreate the sequence
    userClickedPattern = [];
    started = true;
}

// Event listener for user button clicks
$("div[type='button']").on("click", function () {
    if (started) { // Only accept user input if the game has started
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);

        // Check the user's answer after each button click
        var answer = checkAnswer(userClickedPattern.length - 1); // Check up to the current user input length
        if (answer) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    level++;
                    nextSequence();
                }, 1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over, Press any key to restart");
            startOver();
        }
    }
});


///plays sounds for each button
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animations to user clicks
function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


///start game (keyboard press)

$(document).on("keydown",function(){
    if (started!=true) 
    { 
        // Start the game only if (not started)
        nextSequence();
        started=true;
        $("h1").text("Level "+level);
     }
    }
)

///check answer funnction
function checkAnswer()
{
   for(var i=0;i<userClickedPattern.length;i++)
      if(userClickedPattern[i]!=gamePattern[i])
          return false;
    return true;
}

///start the game again if lose
function startOver()
{
    level=1;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
}