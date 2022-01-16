let low = 1
let high = 10
let randomNum = randomInteger(low, high)

let uInput = document.getElementById('u-input');
let chance = document.getElementById('chance');
let guessBtn = document.getElementById('guess-btn');
let restartBtn = document.querySelector('.play-again');
let hint = document.getElementById('hint');
let chanceRemaining = 3


guessBtn.addEventListener('click', startgame)

let playAgain = () => {
    chanceRemaining = 3
    chance.innerHTML = chanceRemaining
    randomNum = randomInteger(low, high)
    uInput.value = ''
    hint.innerHTML = ''
    uInput.disabled = false
}

function startgame() {
    uInputVal = parseInt(uInput.value)
    if (uInputVal) {
        chanceRemaining -= 1
        chance.innerHTML = chanceRemaining
        if (chanceRemaining > 0) {
            if (uInputVal == randomNum) {
                swalFire('You win !', 'success', 'Thank you for playing')
            } else if (uInputVal > randomNum) {
                hint.innerHTML = 'Hint: Correct answer is smaller!'

            } else if (uInputVal < randomNum) {
                hint.innerHTML = 'Hint: Correct answer is greater!'
            }

        } else if (chanceRemaining == 0 && uInputVal == randomNum)
            swalFire('You win !', 'success', 'Thank you for playing')
        else {
            uInput.disabled = true
            swalFire('You Loose !', 'error', `The number was ${randomNum}`)
        }
    } else {
        alert('Enter a number first !!!')
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swalFire(title, icon, wtext) {
    Swal.fire({
        icon: icon,
        title: title,
        text: wtext,
        confirmButtonText: 'Play Again',
    }).then((result) => {
        if (result.isConfirmed) {
            playAgain()
        } else {
            playAgain()
        }
    })
}