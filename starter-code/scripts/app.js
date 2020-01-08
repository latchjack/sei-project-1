function init() {

  //  dom variables
  const grid = document.querySelector('.grid')
  let squares = []
  let direction = null
  const pointCounter = document.querySelector('.points')
  const button = document.querySelector('.start')
  let points = 0
  let speed = 400

  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line prefer-const
  let timerId = setInterval(movePlayer, speed)

  // game variables
  const width = 15
  let snake = [2, 1, 0]
  

  Array(width * width).join('.').split('.').forEach(() => {
    // create 
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  // squares[snake[0]].classList.add('face')

  function clearPage() {
    snake = [2, 1, 0]
    squares = []
    grid.innerHTML = ''
  }

  function wipePoints() {
    points = 0
  }

  function makeGrid() {
    Array(width * width).join('.').split('.').forEach(() => {
      const square = document.createElement('div')
      square.classList.add('grid-item')
      squares.push(square)
      grid.appendChild(square)
    })
  }

  function rebuildGame() {
    clearPage()
    makeGrid()
    wipePoints()
    addPlayer()
    newFood()
    speedUp()
  }

  function addPlayer() {
    snake.map(index => squares[index].classList.add('player'))
  }
  addPlayer()

  function removePlayer() {
    snake.map(index => squares[index].classList.remove('player'))
  }

  function newFood() {
    const availableSquares = squares.filter(square => {
      return !square.classList.contains('player')
    })
    const foodLocation = Math.floor(Math.random() * availableSquares.length)
    availableSquares[foodLocation].classList.add('food')
  }
  newFood()

  function speedUp() {
    clearInterval(timerId)
    speed = speed - 20
    if (speed < 40) {
      speed = 40
      console.log('got too quick, adj to 40')
    }
    // eslint-disable-next-line prefer-const
    timerId = setInterval(movePlayer, speed)
  }

  function snakeEats() {
    if (squares[snake[0]].classList.contains('food')) {
      squares[snake[0]].classList.remove('food')
      snake.push('4') // ! edit this for test - grow faster
      newFood()
      console.log(`old speed was ${speed}`)
      speedUp()
      console.log(`speed is now ${speed}`)
      points += 15
      console.log(`you now have ${points} noms`)
    }
    pointCounter.innerHTML = points
  }
  snakeEats()

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
  }

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 39: if (direction !== 'left') direction = 'right'
        movePlayer()
        // console.log(direction)
        // if (snake % width < width - 1) {
        //   console.log(squares[snake])
        //   snake++
        // }
        break
      case 37: if (direction !== 'right') direction = 'left'
        movePlayer()
        // console.log(direction)
        // if (snake % width > 0) {
        //   snake--
        // }
        break
      case 40: if (direction !== 'up') direction = 'down'
        movePlayer()
        // console.log(direction)
        // if (snake + width < width * width) {
        //   snake += width 
        // }
        break
      case 38: if (direction !== 'down') direction = 'up'
        movePlayer()
        // console.log(direction)
        // if (snake - width >= 0) {
        //   snake -= width
        // }
        break
      default:
        console.log('player shouldnt move')
    }

    // console.log('current player index is' , snake)
  }
  button.addEventListener('click', rebuildGame)
  window.addEventListener('keydown', handleKeyDown)
}
window.addEventListener('DOMContentLoaded', init)