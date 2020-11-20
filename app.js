let computerSecuenceArray = []
let userComputerArray = []
let rounds = 0
desactivateUserTurn()
$empezar = document.querySelector('.button_empezar')
$empezar.onclick = playGame



//Inicio juego o ronda
function playGame() {
    $empezar.style.visibility = 'hidden'
    updateAlert("Turno de la Compu, espere y preste atención")
    updateRound(rounds)

    const newCircle = getComputerCircle()
    computerSecuenceArray.push(newCircle)

    desactivateUserTurn()

    showSecuence(computerSecuenceArray)

    const delayUserToPlay = (computerSecuenceArray.length + 2) * 1000
    setTimeout(() => {
        updateAlert("Su Turno, espero que haya prestado atención")
        activateUserTurn()
    }, delayUserToPlay);

    userComputerArray = []
    rounds++
}

// Turno del Usuario
function userTurn(e) {
    userComputerArray.push(e.target)
    if (e.target !== computerSecuenceArray[userComputerArray.length - 1]) {
        gameLost()
        return
    }
    if (computerSecuenceArray.length === userComputerArray.length) {
        playGame()
    }
}


// Seleccion Circulo aleatorio
function getComputerCircle() {
    const circles = document.querySelectorAll(".imageBorder")
    const randomNumber = Math.floor(Math.random() * circles.length)
    return circles[randomNumber]
}


// Muestra la secuencia en pantalla
function showSecuence(array) {
    array.forEach((circle, index) => {
        const delay = (index + 2) * 1000
        setTimeout(() => {
            circlePressed(circle)
        }, delay);
    })
}

// Animacion para el circulo presionado
function circlePressed(circle) {
    circle.classList.add("click")
    setTimeout(() => {
        circle.classList.remove("click")
    }, 500);
}


//Activa los botones para que el usuario juegue
function activateUserTurn() {
    document.querySelectorAll('.imageBorder').forEach(circle => {
        circle.onclick = userTurn
        circle.classList.add("active")
    })
}

function desactivateUserTurn() {
    document.querySelectorAll('.imageBorder').forEach(circle => {
        circle.onclick = function () {
        }
        circle.classList.remove("active")
    })
}



function updateRound(number) {
    $round = document.querySelector(".roundsboard-text")
    $round.innerText = number
}

function gameLost() {
    updateRound(0)
    rounds = 0
    computerSecuenceArray = []
    userComputerArray = []
    desactivateUserTurn()
    updateAlert("Ha perdido el juego!!", "lost")
    $empezar.style.visibility = 'visible'

}


function updateAlert(text, state = "gano") {
    $alert = document.querySelector(".alert ")

    $alert.innerText = text

    if (state === "lost") {
        $alert.classList.remove("alert-info")
        $alert.classList.add("alert-danger")
    } else {
        $alert.classList.add("alert-info")
        $alert.classList.remove("alert-danger")
    }

}