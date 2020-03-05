const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');

let shuffleQuestions, currentQuestionIndex;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide');
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function resetState(button) {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2 + 2 ?',
        answers: [
            { text: '4', correct: true},
            { text: '22', correct: false}
        ]
    },
    {
        question: 'What is 3 + 5 ?',
        answers: [
            { text: '8', correct: true},
            { text: '35', correct: false}
        ]
    },
    {
        question: 'What is 475 - 1 ?',
        answers: [
            { text: '474', correct: true},
            { text: '476', correct: false}
        ]
    },
    {
        question: 'What is 234 + 234 ?',
        answers: [
            { text: '468', correct: true},
            { text: '123123', correct: false}
        ]
    },
]