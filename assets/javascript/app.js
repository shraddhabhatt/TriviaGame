$(document).ready(function () {
var options = [
	{
		question: "What year did Albert Einstein die?", 
		choice: ["1954", "1960", "1955", "1949"],
		answer: 2,
	 },
	 {
	 	question: "What popular soda beverage was originally developed as a mixer for whiskey?", 
		choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
		answer: 0,
	 }, 
	 {
	 	question: "Kopi luwak is a very expensive type of what?", 
		choice: ["Spice", "Caviar", "Coffee", "Rice variety" ],
		answer: 2,
	}, 
	{
		question: "What colour is Cerulean?", 
		choice: ["Yellow", "Blue", "Red", "Green" ],
		answer: 1,
	}, 
	{
		question: "How many countries in South America", 
		choice: ["20", "15", "14", "16" ],
		answer: 1,
	}, 
	{
		question: "What is the most widely eaten fish in the world?", 
		choice: ["Tilapia", "Herring", "Sardine", "Tuna" ],
		answer: 1,
	}, 
	{
		question: "Which fruit does not ripen once it has been picked?", 
		choice: ["Banana", "Lemon", "Mango", "Apple" ],
		answer: 1,
	}, 
	{
		question: "Which fruit contains the most protein per 100 calories?", 
		choice: ["Guava", "Avocado", "Banana", "Blackberries" ],
		answer: 0,
	},
	{
		question: "The currents of which Ocean create the El Nino effect?", 
		choice: ["Pacific", "Atlantic", "Indian", "Artic" ],
		answer: 0,
	}, 
	{
		question: "Which Desert dominates a large area of Northern Africa?", 
		choice: ["Kalahari", "Sahara", "Gobi", "Atacama" ],
		answer: 1,
	}];

	var timeout = [
	{
		photo: "assets/images/time-out1.png"
	},
	{
		photo: "assets/images/time-out2.jpg"
	}];

	var correct_emo = [
	{
		photo: "assets/images/pass1.jpg"
	},
	{
		photo: "assets/images/pass2.jpg"
	},
	{
		photo: "assets/images/pass3.jpg"
	},
	{
		photo: "assets/images/pass4.jpg"
	}];

	var wrong_emo = [
	{
		photo: "assets/images/fail1.png"
	},
	{
		photo: "assets/images/fail2.jpg"
	},
	{
		photo: "assets/images/fail3.jpg"
	},
	{
		photo: "assets/images/fail4.jpg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 15;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#questionblock").html("<img src='assets/images/trivia.jpg' id='onloadimg'>");
		

$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
			holder.push(options[i]);
		}
})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	
	//$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	
	$("#timeleft").text(timeConverter(timer));
	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$(".main-container").css('background', 'transparent');
				
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		if(unanswerCount > 1)
			$("#answerblock").append("<img src="+timeout[Math.floor(Math.random()*timeout.length)].photo+">");
		else
			$("#answerblock").append("<img src='assets/images/time-out1.png'>");
		hidepicture();
	}	
	timer--;
}

function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
//timer stop
function stop() {
		
		$("#timer").css({"visibility":"collapse"});
		running = false;
		clearInterval(intervalId);

}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {

		$(".main-container").css({'background-image':'url("assets/images/background.jpg")',"background-repeat":"no-repeat", "background-position":"center"});
		//generate random index in array
		index = Math.floor(Math.random()*options.length);
		pick = options[index];

		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		$("#timer").css({"visibility":"visible"});

		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
		}
		//click function to select answer and outcomes
		$(".answerchoice").on("click", function () {
			//grab array position from userGuess
			userGuess = parseInt($(this).attr("data-guessvalue"));

			//correct guess or wrong guess outcomes
			if (userGuess === pick.answer) {
				stop();
				correctCount++;
				userGuess="";
				$(".main-container").css('background', 'transparent');
				$("#answerblock").html("<p>Correct!</p>");
				$("#answerblock").append("<img src=" + correct_emo[Math.floor(Math.random()*correct_emo.length)].photo + ">");
				hidepicture();

			} else {
				stop();
				wrongCount++;
				userGuess="";
				$(".main-container").css('background', 'transparent');
				$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
				$("#answerblock").append("<img src=" + wrong_emo[Math.floor(Math.random()*wrong_emo.length)].photo + ">");
				hidepicture();
			}
		})
}

function hidepicture () {

			newArray.push(pick);
			options.splice(index,1);

			var hidpic = setTimeout(function() {
				$("#answerblock").empty();
				timer= 15;

				//run the score screen if all questions answered
				if ((wrongCount + correctCount + unanswerCount) === qCount) {
					$("#questionblock").empty();
					$("#questionblock").html("<h2>Game Over!  Here's how you did: </h2>");
					$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
					$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
					$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
					$("#timer").css({"visibility":"collapse"});

					$("#reset").show();
					correctCount = 0;
					wrongCount = 0;
					unanswerCount = 0;

				} else {
					runTimer();
					displayQuestion();

				}
			}, 3000);


		}

		$("#reset").on("click", function() {
			$("#reset").hide();
			$("#answerblock").empty();
			$("#questionblock").empty();
			for(var i = 0; i < holder.length; i++) {
				options.push(holder[i]);
			}
			runTimer();
			displayQuestion();

		})

})