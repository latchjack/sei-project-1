function init() {

  //  dom variables
  const grid = document.querySelector('.grid')
  let squares = []
  let direction = null
  const pointCounter = document.querySelector('.points')
  const button = document.querySelector('.start')
  let points = 0
  let speed = 400

  //? START OF TOP SCORE SECTION
  const topScore = document.querySelector('.top-score')

  let storedHiScore = localStorage.getItem('storedHiScore') ? JSON.parse(localStorage.getItem('storedHiScore')) : null
  const data = JSON.parse(localStorage.getItem('storedHiScore'))

  // Function to set up your page to display your high score  
  function hiScoreCreate() {
    const hiScore = document.createElement('div')
    hiScore.classList.add('hi-score')
    hiScore.innerHTML = storedHiScore
    topScore.appendChild(hiScore)
    topScore.removeChild(topScore.firstChild)
  }

  // Function to store player's score into browser's local storage
  function storeScores() {
    if (points > storedHiScore) { // if the current points value is higher than the value stored in local storage
      storedHiScore = points // assign storedHiScore to equal the current value of points
      localStorage.setItem('storedHiScore', JSON.stringify(storedHiScore)) // set storedHiScore into local storage
      // this is a key value pair - you are setting the key above and then giving it the value of your latest 
      // high score
      hiScoreCreate() // this enables the score to be displayed immediately
    }
  }

  function displayHiScore() {
    data ? hiScoreCreate(data) : null
  }
  displayHiScore()

  // To reset the Highest score paste - localStorage.clear() - into the browser console
  // or I can create a function and invoke localStorage.clear() within it - if I want the user to have 
  // control over what is stored.
  //? END OF TOP SCORE SECTION

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line prefer-const
  let timerId = setInterval(movePlayer, speed)

  // game variables
  const width = 15
  // this is the array which displays as the snake on the grid
  let snake = [2, 1, 0]
  
  // building the array grid
  Array(width * width).join('.').split('.').forEach(() => {
    // create 
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  // this is to reset the snake back to its default size and resest the grid
  function clearPage() {
    snake = [2, 1, 0]
    squares = []
    grid.innerHTML = ''
  }

  // clear the points and set it back to 0
  function wipePoints() {
    points = 0
  }

  // this function will rebuild the grid after the game ends
  function makeGrid() {
    Array(width * width).join('.').split('.').forEach(() => {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
    })
  }

  // the speed handler function which makes sure the game is reset to its default speed
  function newGameSpeed() {
    clearInterval(timerId)
    speed = 400
    timerId = setInterval(movePlayer, speed)
  }

  // this function will invoke all of the game building functions and rebuild it to its default state
  function rebuildGame() {
    clearPage()
    makeGrid()
    wipePoints()
    addPlayer()
    newFood()
    newGameSpeed()
  }

  function addPlayer() {
    snake.map(index => squares[index].classList.add('player'))
  }
  addPlayer()

  function removePlayer() {
    snake.map(index => squares[index].classList.remove('player'))
  }

  // i built this function to enable different bugs to spawn with variable points when eaten
  function newFood() {
    const bugs = ['bug0', 'bug1', 'bug2', 'bug3']
    const randomBug = bugs[Math.floor(Math.random() * Math.floor(4))]
    const availableSquares = squares.filter(square => {
      return !square.classList.contains('player')
    })
    const foodLocation = Math.floor(Math.random() * availableSquares.length)
    const squareFood = availableSquares[foodLocation]
    console.log(squareFood)
    squareFood.classList.add('food')
    squareFood.style.backgroundImage = `url('./assets/${randomBug}.png')`
    squareFood.setAttribute('data-id', randomBug)
    
  }
  newFood()

  // ! OLD NEWFOOD AND SNAKEEATS FUNCTION. REVERTS IT BACK TO 1BUG MODE
  // function newFood() {
  //   const availableSquares = squares.filter(square => {
  //     return !square.classList.contains('player')
  //   })
  //   const foodLocation = Math.floor(Math.random() * availableSquares.length)
  //   availableSquares[foodLocation].classList.add('food')
  // }
  // newFood()

  // function snakeEats() {
  //   if (squares[snake[0]].classList.contains('food')) {
  //     squares[snake[0]].classList.remove('food')
  //     snake.push('4')
  //     newFood()
  //     console.log(`old speed was ${speed}`)
  //     speedUp()
  //     console.log(`speed is now ${speed}`)
  //     points += 15
  //     console.log(`you now have ${points} noms`)
  //   }
  //   pointCounter.innerHTML = points
  // }
  // snakeEats()
  // ! END OF OLD NEWFOOD AND SNAKEEATS FUNCTION. REVERTS IT BACK TO 1BUG MODE

  // this function will adjust the speed when a bug is eaten, 
  // it will also make sure the top speed is reverted back to 40 if the game gets too fast
  function speedUp() {
    clearInterval(timerId)
    speed = speed - 15
    if (speed < 40) {
      speed = 40
      console.log('got too quick, adj to 40')
    }
    // eslint-disable-next-line prefer-const
    timerId = setInterval(movePlayer, speed)
  }

  // the snakeEats function is the collision detection for when the snake touches the food
  // it detects which bug was eaten and gives the right amount of points for each one
  function snakeEats() {
    if (squares[snake[0]].classList.contains('food')) {
      squares[snake[0]].classList.remove('food')
      snake.push('4') // ! edit this for test - grow faster
      newFood()
      console.log(`old speed was ${speed}`)
      speedUp()
      console.log(`speed is now ${speed}`)
      if (squares[snake[0]].getAttribute('data-id') === 'bug0') {
        points += 15
        squares[snake[0]].classList.remove('food')
        squares[snake[0]].style.backgroundImage = ''
        squares[snake[0]].setAttribute('data-id', '')
      } else if (squares[snake[0]].getAttribute('data-id') === 'bug1') {
        points += 20
        squares[snake[0]].classList.remove('food')
        squares[snake[0]].style.backgroundImage = ''
        squares[snake[0]].setAttribute('data-id', '')
      } else if (squares[snake[0]].getAttribute('data-id') === 'bug2') {
        points += 25
        squares[snake[0]].classList.remove('food')
        squares[snake[0]].style.backgroundImage = ''
        squares[snake[0]].setAttribute('data-id', '')
      } else if (squares[snake[0]].getAttribute('data-id') === 'bug3') {
        points += 30
        squares[snake[0]].classList.remove('food')
        squares[snake[0]].style.backgroundImage = ''
        squares[snake[0]].setAttribute('data-id', '')
      }
      console.log(`you now have ${points} noms`)
    }
    pointCounter.innerHTML = points
  }
  snakeEats()

  // this function reads the input from the handleKeyDown function and runs the correct math depending
  // on which direction the user has pressed to calculate the direction
  function movePlayer() {
    //console.log(snake[0])
    if (direction === 'right') {
      removePlayer()
      snake.pop()
      if (snake[0] % width === 14) {
        snake[0] -= 14
      }
      snake.unshift(snake[0] + 1)
      addPlayer()
    }
    if (direction === 'left') {
      removePlayer()
      snake.pop()
      if (snake[0] % width === 0) {
        snake[0] += 14
      }
      snake.unshift(snake[0] - 1)
      addPlayer()
      // console.log(snake)
    }
    if (direction === 'down') {
      removePlayer()
      snake.pop()
      if (snake[0] >= 210) {
        snake[0] -= 210
      }
      snake.unshift(snake[0] + 15)
      addPlayer()
      // console.log(snake)
    }
    if (direction === 'up') {
      removePlayer()
      snake.pop()
      if (snake[0] <= 14) {
        snake[0] += 210
      }
      snake.unshift(snake[0] - 15)
      addPlayer()
      // console.log(snake)
    }
    snakeEats()
    collisionCheck()
  }

  // the collisionCheck function detects when the head of the snake touches another part
  // of its body
  function collisionCheck() {
    if (snake.slice(1).includes(snake[0])) {
      //console.log('hit')
      gameOver()
    }
  }

  function gameOver() {
    clearInterval(timerId)
    direction = undefined
    grid.innerHTML = `<div><p>YOU LOSE! YOUR SCORE WAS ${points} NOMS</p></div>`
    pointCounter.innerHTML = ''
    storeScores()
  }

  // this function listens for the arrow key presses and set the value of the direction varialble
  // which is later read by the movePlayer function
  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 39: if (direction !== 'left') direction = 'right'
        movePlayer()

        break
      case 37: if (direction !== 'right') direction = 'left'
        movePlayer()

        break
      case 40: if (direction !== 'up') direction = 'down'
        movePlayer()

        break
      case 38: if (direction !== 'down') direction = 'up'
        movePlayer()

        break
      default:
        console.log('player shouldnt move')
    }
  }
  // event listeners for the arrow keys and the button
  button.addEventListener('click', rebuildGame)
  window.addEventListener('keydown', handleKeyDown)
}
window.addEventListener('DOMContentLoaded', init)