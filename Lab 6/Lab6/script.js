
// Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used for styling web pages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: "CSS"
    },
    {
        question: "Which language makes web pages interactive?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: "JavaScript"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "//",
            "<!-- -->",
            "#",
            "**"
        ],
        answer: "//"
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: [
            "int",
            "var",
            "string",
            "float"
        ],
        answer: "var"
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let selectedAnswer = "";
let quizQuestions = [];

// Shuffle Questions
function shuffleQuestions() {
    quizQuestions = [...questions];

    quizQuestions.sort(() => Math.random() - 0.5);
}

// Start Timer
function startTimer() {
    clearInterval(timer);

    timeLeft = 15;
    document.getElementById("timer").textContent = timeLeft;

    timer = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);

            document.getElementById("feedback").textContent =
                "Time is up!";

            document.getElementById("nextBtn").disabled = false;
        }

    }, 1000);
}

// Display Question
function displayQuestion() {

    selectedAnswer = "";

    let q = quizQuestions[currentQuestion];

    document.getElementById("question").textContent = q.question;

    document.getElementById("progress").textContent =
        "Question " + (currentQuestion + 1) +
        " of " + quizQuestions.length;

    document.getElementById("feedback").textContent = "";

    document.getElementById("nextBtn").disabled = true;

    let optionsHTML = "";

    q.options.forEach(function(option) {

        optionsHTML += `
            <label class="option">
                <input type="radio" name="answer"
                value="${option}"
                onchange="checkAnswer('${option}')">
                ${option}
            </label>
        `;

    });

    document.getElementById("options").innerHTML = optionsHTML;

    startTimer();
}

// Check Answer
function checkAnswer(answer) {

    if (selectedAnswer !== "") {
        return;
    }

    selectedAnswer = answer;

    clearInterval(timer);

    let correctAnswer = quizQuestions[currentQuestion].answer;

    if (answer === correctAnswer) {

        score++;

        document.getElementById("feedback").textContent =
            "Correct Answer!";

    } else {

        document.getElementById("feedback").textContent =
            "Incorrect! Correct answer: " + correctAnswer;

    }

    document.getElementById("score").textContent =
        "Score: " + score;

    document.getElementById("nextBtn").disabled = false;
}

// Next Question
function nextQuestion() {

    if (selectedAnswer === "" && timeLeft > 0) {
        return;
    }

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        displayQuestion();

    } else {

        finishQuiz();

    }
}

// Start Quiz
function startQuiz() {

    shuffleQuestions();

    currentQuestion = 0;
    score = 0;

    document.getElementById("score").textContent = "Score: 0";

    document.getElementById("startBtn").style.display = "none";

    displayQuestion();
}

// Finish Quiz
function finishQuiz() {

    clearInterval(timer);

    document.getElementById("question").textContent =
        "Quiz Completed!";

    document.getElementById("options").innerHTML = "";

    document.getElementById("feedback").textContent =
        "Your final score is " + score +
        " out of " + quizQuestions.length;

    document.getElementById("nextBtn").style.display = "none";

    document.getElementById("timer").textContent = "Finished";

    document.getElementById("progress").textContent =
        "Thank you for playing!";

    document.getElementById("startBtn").textContent = "Play Again";

    document.getElementById("startBtn").style.display = "inline-block";
    document.getElementById("startBtn").onclick = restartQuiz;
}

// Restart Quiz
function restartQuiz() {

    document.getElementById("nextBtn").style.display = "inline-block";

    startQuiz();
}
