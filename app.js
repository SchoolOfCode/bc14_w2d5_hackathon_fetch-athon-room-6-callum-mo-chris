/* 
Step 1 - Getting data and brainstorming (20 - 30 mins)

Send a request to each of the APIs below using your browser's address bar to investigate what you get back and check that the APIs are each up and running.

Try and fetch in your JavaScript and console log until you see the same data you saw in the browser.

Visit the documentation for the APIs and investigate further.

From there, brainstorm what you could make with your knowledge of JavaScript, the DOM and the data you have received.
*/

/* 
MAIN PLAN
Score counter
Player is shown first question and possible answers 
Player chooses answer
Told if right or wrong, if right increase score
Repeat until 10 questions answered

BONUS
Ask if they want to play again
Keep record of previous game
*/

/* Step by step plan
When button clicked, get new question

H1 should show this question

everytime we ask a new question, all answers should randomize
randomly assign 3 wrong answers to a button
randomly assign correct answer to a button

start count at question 0
add 1 to count every time new question is started

*/

let score = 0;
/*Make an array inside the function
have 4 variables inside the array [correct answer,incorrect1,incorrect2,
etc]
everytime the function is run we assigned variables to eg correct answer
correctAnswer = correctanswer.value
each time function is run, we randomly assign each variable of the array
to a button. 0 to 3*/
async function getQuestion() {
	const response = await fetch(
		'https://opentdb.com/api.php?amount=1&type=multiple'
	);
	const data = await response.json();

	// shows a random question in console
	console.log(data.results[0].correct_answer);
	const randomQuestion = data.results[0].question
		.replace(/&#039;|&quot;/g, "'")
		.replace(/&amp;/g, '&');
	// change h1 textcontent to question
	const h1 = document.querySelector('#question');
	h1.textContent = randomQuestion;

	//answers
	let correctAnswer = data.results[0].correct_answer
		.replace(/&#039;|&quot;/g, "'")
		.replace(/&amp;/g, '&');
	let incorrectAnswer1 = data.results[0].incorrect_answers[0]
		.replace(/&#039;|&quot;/g, "'")
		.replace(/&amp;/g, '&');
	let incorrectAnswer2 = data.results[0].incorrect_answers[1]
		.replace(/&#039;|&quot;/g, "'")
		.replace(/&amp;/g, '&');
	let incorrectAnswer3 = data.results[0].incorrect_answers[2]
		.replace(/&#039;|&quot;/g, "'")
		.replace(/&amp;/g, '&');
	const answers = [
		correctAnswer,
		incorrectAnswer1,
		incorrectAnswer2,
		incorrectAnswer3,
	];

	const answerButtons = [
		document.querySelector('#option1'),
		document.querySelector('#option2'),
		document.querySelector('#option3'),
		document.querySelector('#option4'),
	];

	// loop through buttons, assign a random answer to each
	for (let i = 0; i < answerButtons.length; i++) {
		// generate random index from 0 to last item in answers array
		const randomIndex = Math.floor(Math.random() * answers.length);
		// random answer at that index
		const randomAnswer = answers[randomIndex];
		// assign answer to button at index i
		answerButtons[i].textContent = randomAnswer;
		// remove that answer from answers array, so no duplicates
		answers.splice(randomIndex, 1);
		// console.log(randomAnswer);
		// console.log(answers);
	}

	// select score and result elements
	const showScore = document.querySelector('#show-score');
	const result = document.querySelector('#result');
	showScore.textContent = `Score: 0`;
	result.textContent = '';
	// function that takes user choice
	function isCorrect(input) {
		if (input === correctAnswer) {
			score++;
			showScore.textContent = `Score: ${score}`;
			result.textContent = `Correct! 🎉🎉`;
		} else {
			showScore.textContent = `Score: ${score}`;
			result.textContent = `Wrong. The answer was: ${correctAnswer}.`;
		}
	}
	// add an event listener to each answer button
	// if user selects right answer, add 1 to score
	// show a message showing if the user was right/wrong
	answerButtons.forEach(button =>
		button.addEventListener('click', () => isCorrect(button.textContent))
	);
}

const newQuestion = document.querySelector('#new-question');
newQuestion.addEventListener('click', getQuestion);
