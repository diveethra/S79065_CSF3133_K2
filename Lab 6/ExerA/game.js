// Game state variables
// Global variables
let playerName = "";
let gameStarted = false;
let startDate = "";

let wins = 0;
let losses = 0;
let draws = 0;

let results = [];


// Start Game
function startGame() {

    let name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    playerName = name;
    startDate = new Date().toLocaleString();
    gameStarted = true;

    document.getElementById("welcomeMessage").innerHTML =
        "Welcome, " + playerName + "!";

}


// Get Computer Choice
function getComputerChoice() {

    let choices = ["rock", "paper", "scissors"];

    let randomIndex = Math.floor(Math.random() * choices.length);

    return choices[randomIndex];

}


// Play Round
function playRound(playerChoice) {

    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();

    let roundResult = "";

    if (playerChoice === computerChoice) {

        roundResult = "Draw";
        draws++;

    } else if (

        (playerChoice === "rock" && computerChoice === "scissors") ||

        (playerChoice === "paper" && computerChoice === "rock") ||

        (playerChoice === "scissors" && computerChoice === "paper")

    ) {

        roundResult = "Win";
        wins++;

    } else {

        roundResult = "Lose";
        losses++;

    }


    // Store results in array
    results.push({

        player: playerChoice,
        computer: computerChoice,
        result: roundResult

    });


    // Display result
    document.getElementById("result").innerHTML =
        playerName + " chose " + playerChoice +
        ". Computer chose " + computerChoice +
        ". Result: " + roundResult;


    updateScore();
    updateHistory();

}


// Update Score
function updateScore() {

    document.getElementById("wins").innerHTML = wins;

    document.getElementById("losses").innerHTML = losses;

    document.getElementById("draws").innerHTML = draws;

}


// Update History
function updateHistory() {

    let historyBody = document.getElementById("history");

    historyBody.innerHTML = "";

    for (let i = 0; i < results.length; i++) {

        let row = document.createElement("tr");

        row.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td>" + results[i].player + "</td>" +
            "<td>" + results[i].computer + "</td>" +
            "<td>" + results[i].result + "</td>";

        historyBody.appendChild(row);

    }

}


// Show Summary
function showSummary() {

    let totalWins = 0;
    let totalLosses = 0;
    let totalDraws = 0;

    for (let i = 0; i < results.length; i++) {

        if (results[i].result === "Win") {

            totalWins++;

        } else if (results[i].result === "Lose") {

            totalLosses++;

        } else {

            totalDraws++;

        }

    }

    let totalRounds = results.length;

    let percentage = 0;

    if (totalRounds > 0) {

        percentage = (totalWins / totalRounds) * 100;

    }

    alert(
        "Game Summary\n\n" +
        "Player: " + playerName + "\n" +
        "Date: " + (startDate || "Not started") + "\n" +
        "Total Rounds: " + totalRounds + "\n" +
        "Wins: " + totalWins + "\n" +
        "Losses: " + totalLosses + "\n" +
        "Draws: " + totalDraws + "\n" +
        "Win Percentage: " + percentage.toFixed(2) + "%"
    );

}


// Reset Game
function resetGame() {

    wins = 0;
    losses = 0;
    draws = 0;

    results = [];

    playerName = "";
    gameStarted = false;
    startDate = "";

    document.getElementById("playerName").value = "";

    document.getElementById("welcomeMessage").innerHTML = "";

    document.getElementById("result").innerHTML = "";

    document.getElementById("history").innerHTML = "";

    updateScore();

}