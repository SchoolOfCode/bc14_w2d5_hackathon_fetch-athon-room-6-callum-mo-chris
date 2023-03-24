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
async function getQuestion() {
	const response = await fetch(
		'https://opentdb.com/api.php?amount=1&type=multiple'
	);
	const data = await response.json();
	// shows a random question in console
	console.log(data.results[0]);
	const randomQuestion = data.results[0].question
		.replace(/&#039;|&quot;/g, "'")
		.replace(/&amp;/g, '&');
	// change h1 textcontent to question
	const h1 = document.querySelector('#question');
	h1.textContent = randomQuestion;
	// change button textcontent to choices
	document.querySelector('#option1').textContent = data.results[0];
}

const newQuestion = document.querySelector('#new-question');
newQuestion.addEventListener('click', getQuestion);
