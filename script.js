//Var for the button to start the game, load the next question and finish the game 
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var finishButton = document.getElementById('finish-btn')
//Var for selecting multiple elements on the page to manipulate 
var mainCardElement = document.getElementById('main-card')
var questionCardElement = document.getElementById('question-card')
var timerElement = document.getElementById('timer')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var pointElement = document.getElementById('score-count')

// variable to keep track of the user's score 
var scoreCount = 0

var getRandomQuestion, questionIndex

//event listener for when the start game button is pressed 
startButton.addEventListener('click', startGame)
 
nextButton.addEventListener('click', () => {
    questionIndex++
    nextQuestion()
})

finishButton.addEventListener('click', endGame)

//function to start the game when the start button is pressed
function startGame() {
    mainCardElement.classList.add('hide')
    // makes it get a random question
    getRandomQuestion = questions.sort(() => Math.random() - .5)
    questionIndex = 0
    questionCardElement.classList.remove('hide')
    timerElement.classList.remove('hide')
    pointElement.classList.remove('hide')
    nextQuestion()
    timer()
}


//function that will get the next question 
function nextQuestion() {
    resetState()
    showQuestion(getRandomQuestion[questionIndex])
}
//function removes the previous answer buttons
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
//function called when the game is started
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answers => {
        var button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('btn')
        if (answers.correct) {
            button.dataset.correct = answers.correct

        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
//function for when the user selects an answer
function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (getRandomQuestion.length > questionIndex + 1) {
        nextButton.classList.remove('hide')
        //adds a point if the selected answer was correct 
        if (event.target.dataset.correct === 'true') {
            
            scoreCount++
            document.getElementById('scoreDisplay').innerHTML = 'Points:  ' + scoreCount
        }
    } else {
        //adds a point if the selected answer was correct and it was the last question 
        if (event.target.dataset.correct === 'true') {
            scoreCount++
            pointElement.classList.add('hide')
            console.log(scoreCount)
        }
        localStorage.setItem("score", scoreCount);

        finishButton.classList.remove('hide')
    }
}


//function to add green and red to the buttons for incorrect and correct answers
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
//removes the green and red which indicate the right answer AFTER moving to the next question 
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
//Game timer that is called by pressing the start game button, if the timer reaches 0 it will alert the user that time is up
function timer() {
    var sec = 120; 
    var timer = setInterval(function () {
        document.getElementById('timerDisplay').innerHTML = '' + sec + '   seconds remaining'
        sec--
        if (sec < 0) {
            clearInterval(timer)
            alert('TIME IS UP')
            endGame()
        }
    }, 1000)
}


// function that will end the game and bring the user to the score screen. 
function endGame() {
    window.location.href = "scores.html"

}



//Array to store all of the questions and answers
var questions = [
    {
        question: 'What symbol means to go up a half step?',
        answers: [
            { text: 'Flat', correct: false },
            { text: 'Sharp', correct: true },
            { text: 'Natural', correct: false },
            { text: 'Double sharp', correct: false },
        ]
    },
    {
        question: 'How many keys are there on a piano?',
        answers: [
            { text: '88', correct: true },
            { text: '72', correct: false },
            { text: '91', correct: false },
            { text: '63', correct: false },
        ]
    },
    {
        question: 'Who wrote The Magic Flute?',
        answers: [
            { text: 'Bach', correct: false },
            { text: 'Beethoven', correct: false },
            { text: 'Mozart', correct: true },
            { text: 'Handel', correct: false },
        ]
    },
    {
        question: 'Who wrote Maple Leaf Rag?',
        answers: [
            { text: 'Dizzy Gillespie', correct: false },
            { text: 'Scott Joplin', correct: true },
            { text: 'George Gershwin', correct: false },
            { text: 'John Denver', correct: false },
        ]
    },
    {
        question: 'What does the flat symbol mean?',
        answers: [
            { text: 'Go up a whole step', correct: false },
            { text: 'Play up an octave', correct: false },
            { text: 'Pause', correct: false },
            { text: 'Go down a half step', correct: true },
        ]
    },
    {
        question: 'How many different scales are there?',
        answers: [
            { text: '12', correct: true },
            { text: '13', correct: false },
            { text: '10', correct: false },
            { text: '11', correct: false },
        ]
    },
    {
        question: 'What is the name of a scale that includes every single note in a range?',
        answers: [
            { text: 'Pentatonic', correct: false },
            { text: 'Blues', correct: false },
            { text: 'Chromatic', correct: true },
            { text: 'The C scale', correct: false },
        ]
    },
    {
        question: 'How many counts does a quarter note get in 4/4 time?',
        answers: [
            { text: '1', correct: true },
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: false },
        ]
    },
    {
        question: 'What does a fermata mean to do?',
        answers: [
            { text: 'Go faster', correct: false },
            { text: 'Play an octave lower', correct: false },
            { text: 'Go slower', correct: false },
            { text: 'Pause', correct: true },
        ]
    },
    {
        question: 'What symbol means to get louder?',
        answers: [
            { text: 'Diminuendo', correct: false },
            { text: 'Allegro', correct: false },
            { text: 'Crescendo', correct: true },
            { text: 'Forte', correct: false },
        ]
    },

]