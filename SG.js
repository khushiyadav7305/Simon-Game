let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start game on key press
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// Flash for game sequence
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

// Flash for user click
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

// Next level
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random button select
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    // Show sequence to user
    let i = 0;
    let interval = setInterval(() => {
        let currColor = gameSeq[i];
        let currBtn = document.querySelector(`.${currColor}`);
        gameFlash(currBtn);
        i++;
        if (i >= gameSeq.length) {
            clearInterval(interval);
        }
    }, 600);
}

// Check user input
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score: <b>${level}</b><br>Press any key to Restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

// User button press
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Event listener for all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset function
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}





