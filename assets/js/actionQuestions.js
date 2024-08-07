function handleClick(radioId) {
	const radio = document.getElementById(radioId);
	if(!radio.checked){
		radio.checked = true;
	}
}

// Função para renderizar uma questão
function renderQuestion(question) {
	questionAct.innerHTML = `
	<div class="questionNumberCount">
		<h2 class="count">${question.id}/${max}
	</div>
	`
	questionAct.innerHTML += convertQuestionToLi(question);
}

// Função para verificar a resposta
function checkAnswer() {
	const selectedAnswer = document.querySelector('input[name="answer"]:checked');

	if (selectedAnswer) {
		const currentQuestion = questionsListArray[currentIndex];
		if (selectedAnswer.value === currentQuestion.correct_answer) {
			selectedAnswer.parentElement.classList.add('rightQuestion');
		} else {
			selectedAnswer.parentElement.classList.add('wrongQuestion');
			showRightQuestion(currentQuestion.correct_answer);
		}

		changeButtonToNextOrFinish()
		
	} else {
		alert('Please select an answer.');
	}
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos de posição
    }
    return array;
}

function showRightQuestion(correctAnswer) {
	const container = document.getElementById('rightAnswerContainer');
	
	const title = document.createElement('h2');
	title.textContent = 'Right Answer';
	
	const answerLabel = document.createElement('span');
	answerLabel.className = 'alternative rightQuestion';
	answerLabel.textContent = correctAnswer;
	
	container.appendChild(title);
	container.appendChild(document.createElement('br'));
	container.appendChild(answerLabel);
}

function changeButtonToNextOrFinish() {
	const button = document.getElementById('btCheckAnswer');
	currentIndex++;
	if(currentIndex == 10){
		button.value = 'Finish Test';
		button.onclick = function() {
			window.location.href = 'index.html';
		};
	}else{
		button.value = 'Next';
		button.onclick = function() {
			nextQuestion() 
		};
	}
}

function nextQuestion(){
	if (currentIndex < questionsListArray.length) {
		renderQuestion(questionsListArray[currentIndex]);
	} else {																					// POR ENQUANTO ESTA SEM NECESSIDADE ESSE ELSE
		alert('Fim do quiz!');
		currentIndex = 0;  // Reiniciar o índice para começar o quiz novamente
		renderQuestion(questionsListArray[currentIndex]);
	}
}