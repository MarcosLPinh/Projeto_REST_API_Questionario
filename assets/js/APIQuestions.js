const apiQuestions = {}
const questionAct = document.getElementById('questionAct')

let max;
let questionsListArray = []
let id = 1
let currentIndex = 0

function convertQuestionApiDetailToModel(questionDetail) {
    const question = new Question()
	question.id = id
    question.category = questionDetail.category
	question.difficulty = questionDetail.difficulty
	
	question.correct_answer = questionDetail.correct_answer
	
	if(questionDetail.incorrect_answers.length == 1){
		if(question.correct_answer === "True"){
			question.answers = [question.correct_answer, questionDetail.incorrect_answers[0]]
		}else{
			question.answers = [questionDetail.incorrect_answers[0], question.correct_answer]
		}
	}else{
		question.answers = shuffleArray([...questionDetail.incorrect_answers, question.correct_answer])
	}
	
	question.question = questionDetail.question
	question.type = questionDetail.type
	
	id = id + 1
    return question
}

apiQuestions.getList = (qtd = 2) => {
	const url = `https://opentdb.com/api.php?amount=${qtd}`
	
	return fetch(url)
			.then((response) => response.json())
			.then((jsonBody) => jsonBody.results)
			.then((questions) => questions.map(convertQuestionApiDetailToModel))
}

function convertQuestionToLi(question) {
    return `
		<span class="questionSpan">${question.question}</span>

			${question.answers.map((answer, index) => `
			<div class="alternative" onclick="handleClick('answer${index}')">
				<input type="radio" id="answer${index}" name="answer" value="${answer}">
				<label class="labelAlternative" for="answer${index}">${answer}</label><br>
			</div>
			`).join('')}
		
		<input id="btCheckAnswer" class="btCheckAnswer" type="button" value="Check the Answer" onclick="checkAnswer()">
		
		<div id="rightAnswerContainer" >
		
		</div>
    `
}

apiQuestions.getList(10).then((apiQuestions  = []) => {
		questionsListArray = apiQuestions
		console.log(questionsListArray)
		
		max = questionsListArray.length;
		
        renderQuestion(questionsListArray[0])
})