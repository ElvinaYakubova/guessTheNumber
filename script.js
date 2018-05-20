var from = document.querySelector('.bound__val_from'),
    to = document.querySelector('.bound__val_to'),
    progAns = document.querySelector('.main__text_ans'),
    attemptsCnt = document.querySelector('.main__text_attemptsCnt'),
    guessInput = document.querySelector('.main__input'),
    prevBtn = document.querySelector('.main__btn_prev'),
    guesses = document.querySelector('.main__output'),
    restartBtn, guessBtn,
    number, numberOfGuesses;


function writeMessage(elem, message) {
    elem.textContent = message;
}

function startGame() {
    //check for valid input
    if (from.value === "") {
        from.focus();
        return;
    }
    if (to.value === "") {
        to.focus();
        return;
    }

    var mini = Number(from.value),
        maxi = Number(to.value);

    if (mini > maxi) {
        return;
    }

    number = Math.floor(Math.random() * (maxi - mini + 1) + mini);
    numberOfGuesses = Math.floor(Math.log2(maxi - mini + 1) + 1);

    document.querySelector('.start').classList.add('hide');
    document.querySelector('.main').classList.remove('hide');

    //create guess button
    guessBtn = document.createElement('button');
    guessBtn.setAttribute('value', 'Play again');
    guessBtn.classList.add('main__btn', 'main__btn_guess');
    guessBtn.textContent = 'Guess';
    document.querySelector('.main__form').appendChild(guessBtn);
    guessBtn.addEventListener('click', userGuess);

    var guessIcon = document.createElement('i');
    guessIcon.classList.add('fa', 'fa-magic');
    document.querySelector('.main__btn_guess').appendChild(guessIcon);

    writeMessage(attemptsCnt, "Number of attempts: " + numberOfGuesses);
}


function userGuess() {
    if (guessInput.value === "") {
        writeMessage(progAns, "Input is empty!");
        return;
    }

    var curAns = Number(guessInput.value);

    numberOfGuesses--;
    writeMessage(attemptsCnt, "Number of attempts: " + numberOfGuesses);

    guesses.value += curAns + " ";

    if (curAns == number) {
        writeMessage(progAns, "Congratulations, you win!");
        gameOver();
    }
    else if(numberOfGuesses === 0) {
        writeMessage(progAns, "You used all attempts. Game over");
        gameOver();
    }
    else {
        if (curAns > number) {
            writeMessage(progAns, "The guess is too high!");
        } else {
            writeMessage(progAns, "The guess is too low!");
        }
    }
}


function gameOver() {
    guessBtn.parentNode.removeChild(guessBtn);
    guessInput.disabled = true;

    //create restart button instead of guess
    restartBtn = document.createElement('input');
    restartBtn.setAttribute('type', 'button');
    restartBtn.setAttribute('value', 'Play again');
    restartBtn.classList.add('main__btn', 'main__btn_restart');
    document.querySelector('.main__form').appendChild(restartBtn);
    restartBtn.addEventListener('click', restart);
}

function restart() {
    restartBtn.parentNode.removeChild(restartBtn);

    from.value = '';
    to.value = '';
    guessInput.disabled = false;
    guessInput.value = '';
    guesses.value = '';
    if (!guesses.classList.contains('hide')) showGuesses();
    writeMessage(progAns, 'Waiting for input number');

    document.querySelector('.main').classList.add('hide');
    document.querySelector('.start').classList.remove('hide');
}

function showGuesses() {
    function changeContent(prev, cur, text) {
        var prevIcon = document.querySelector(prev);
        prevIcon.parentNode.removeChild(prevIcon);

        prevBtn.textContent = text;

        var icon = document.createElement('i');
        icon.classList.add('fa', cur);
        prevBtn.appendChild(icon);
    }

    if (guesses.classList.contains('hide')) {
        guesses.classList.remove('hide');
        changeContent('.fa-eye', 'fa-eye-slash', 'Hide previous guesses');
    }
    else {
        guesses.classList.add('hide');
        changeContent('.fa-eye-slash', 'fa-eye', 'Show previous guesses');
    }
}

