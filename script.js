const simonButtons = document.querySelectorAll('.buttons button')
const colors = ['green', 'red', 'yellow', 'blue'];
const heading1 = document.querySelector('h1')
const heading2 = document.querySelector('h2')
let randomize = Math.floor(Math.random() * colors.length);

const game = {
    simonPattern: [],
    userPattern: [],
    gameStarted: false,
    gameLevel: 0,
}

// Event Listeners
document.addEventListener('keypress', newLevel)

simonButtons.forEach(element => {
    element.addEventListener('click', function() {
        if (!game.gameStarted) {}
        else {
            pressed(element)
            newPattern(element)
        }
    })
})

// Functions .. //
function newLevel() {
    game.gameStarted = true;
    game.gameLevel += 1;
    game.userPattern = [];

    heading1.textContent = 'The Game has started'
    heading2.textContent = `Level ${game.gameLevel}`

    document.removeEventListener('keypress', newLevel)
    simonPlays()
}

function simonPlays() {
    randomize = Math.floor(Math.random() * colors.length)
    game.simonPattern.push(colors[randomize])
    setTimeout(function() {
        pressed(simonButtons[randomize])
    }, 500)
}

function pressed(element) {
    element.classList.add('pressed')
    setTimeout(function() {
        element.classList.remove('pressed')
    }, 100)

    playAudio(element.id)
}

function playAudio(id) {
    const audio = new Audio(`sounds/${id}.mp3`)
    audio.play()
}

function newPattern(element) {
    game.userPattern.push(element.id)
    const condition = checkPattern(game.userPattern, game.simonPattern);
    if (condition === 'wait') {
        
    } else if (!condition) {
        gameOver()
    } else {
        newLevel()
    }
}

function checkPattern(pattern1, pattern2) {
    const length = game.gameLevel + pattern1.length >= pattern2.length ? pattern1.length : pattern2.length
    for (let i = 0; i < length; i++) {
        if (pattern1[i] !== pattern2[i]) return false
    }

    if (pattern1.length === pattern2.length) return true
    return 'wait'
}

function gameOver() {
    game.gameStarted = false;
    game.gameLevel = 0;
    game.userPattern = [];
    game.simonPattern = [];
    randomize = Math.floor(Math.random() * colors.length)

    heading1.textContent = 'GAME OVER'
    heading2.textContent = 'Press any keys to restart'
    document.querySelector('body').classList.add('gameover');
    setTimeout(function() {
        document.querySelector('body').classList.remove('gameover');
    }, 100)

    document.addEventListener('keypress', newLevel)
}