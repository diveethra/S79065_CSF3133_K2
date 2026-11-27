
/*
ERROR LIST:

Error 1 (grade.html, Line 9):
Missing return statement in onsubmit.

Error 2 (grade.html, Line 19):
Incorrect JavaScript filename grades.js.
Correct filename is grade.js.

Error 3 (grade.js, Line 14):
Used && instead of || in mark validation.

Error 4 (grade.js, Line 30):
Used colour instead of color.

Error 5 (grade.js, Line 38):
Loop starts from 1 instead of 0.

Error 6 (grade.js, Line 9):
Missing validation for empty mark.

Error 7 (grade.js, Line 13):
parseInt() should be replaced with Number().

Error 8 (grade.js, Line 28):
Result colour should depend on the grade.
*/


// Function to check student mark
function checkMark() {

    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Check empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check empty mark
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check numeric value
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = Number(mark);

    // Check mark range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    let colour;

    // Calculate grade
    if (mark >= 80) {
        grade = "A";
        colour = "green";
    }
    else if (mark >= 65) {
        grade = "B";
        colour = "green";
    }
    else if (mark >= 50) {
        grade = "C";
        colour = "orange";
    }
    else {
        grade = "F";
        colour = "red";
    }

    // Display student result
    document.getElementById("result").innerHTML =
        name + " got grade " + grade;

    // Change result colour
    document.getElementById("result").style.color = colour;

    // Display date and time
    let malaysiaTime = new Date().toLocaleString("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    dateStyle: "medium",
    timeStyle: "medium"
});

document.getElementById("checkedTime").innerHTML =
    "Checked on: " + malaysiaTime;

    return false;
}


// Function to generate random mark
function randomMark() {

    let random = Math.floor(Math.random() * 101);

    document.getElementById("mark").value = random;
}


// Function to display grade table
function showTable() {

    let grades = ["A", "B", "C", "F"];

    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";

    // Table heading
    tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

    // Display all grades
    for (let i = 0; i < grades.length; i++) {

        tableHTML += "<tr><td>" + grades[i] +
            "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";

    document.getElementById("tableContainer").innerHTML =
        tableHTML;
}
