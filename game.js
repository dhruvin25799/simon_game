var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasGameStarted = false;
var level;

$(document).keydown(function() {
    if (!hasGameStarted) {
        hasGameStarted = true;
        level = 0;
        $("#level-title").text("Level 0");
        nextSequence();
    }
})

function startOver() {
    level = 0;
    hasGameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
            userClickedPattern = [];
        }
        console.log("Success");
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        console.log("Wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(key) {
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function nextSequence() {
    level = level + 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function() {
    var userChosenColour = this.id
    userClickedPattern.push(userChosenColour);
    playSound(this.id);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})