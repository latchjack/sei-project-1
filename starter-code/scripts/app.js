function init() {

  //  dom variables
  const grid = document.querySelector('.grid')
  const squares = []
  let direction = null
  const pointCounter = document.querySelector('.points')
  const messageBox = document.querySelector('.message')

  let points = 0

  let speed = 400
  // eslint-disable-next-line no-unused-vars
  const timerId = setInterval(movePlayer, speed)

  // game variables
  const width = 15
  // eslint-disable-next-line prefer-const
  let snake = [3, 2, 1]

  Array(width * width).join('.').split('.').forEach(() => {
    // create 
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  function addPlayer() {
    snake.map(index => squares[index].classList.add('player'))
  }
  addPlayer()

  function removePlayer() {
    snake.map(index => squares[index].classList.remove('player'))
  }

  function newFood() {
    const foodLocation = Math.floor(Math.random() * squares.length)
    squares[foodLocation].classList.add('food')
    // if (squares[foodLocation].classList.contains('player')) {
    //   console.log('oops!')
    //   foodLocation += Math.floor(Math.random() * squares.length)
    // }
  }
  newFood()

  function speedUp() {
    speed -= 50
  }

  function snakeEats() {
    if (squares[snake[0]].classList.contains('food')) {
      squares[snake[0]].classList.remove('food')
      snake.push('4', '4', '4', '4', '4', '4', '4', '4') // ! edit this for test - grow faster
      newFood()
      console.log(speed)
      speedUp()
      console.log(speed)
      points += 15
      console.log(points)
    }
    pointCounter.innerHTML = points
  }
  snakeEats()

  function movePlayer() {
    // console.log(squares[snake[0]])
    if (direction === 'right') {
      removePlayer()
      snake.pop()
      if (snake[0] % width === 14) {
        snake[0] -= 14
      }
      snake.unshift(snake[0] + 1)
      addPlayer()
      // console.log(snake)

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
    // if square is already occupied
    if (snake.slice(1).includes(snake[0])) {
      // game over
      console.log('hit')
      gameOver()
      messageBox.innerHTML = 'GAME OVER!'
    }
  }

  function gameOver() {
    direction = undefined
    removePlayer()
  }

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 39: if (direction !== 'left') direction = 'right'
        movePlayer()
        console.log(direction)
        // if (snake % width < width - 1) {
        //   console.log(squares[snake])
        //   snake++
        // }
        break
      case 37: if (direction !== 'right') direction = 'left'
        movePlayer()
        console.log(direction)
        // if (snake % width > 0) {
        //   snake--
        // }
        break
      case 40: if (direction !== 'up') direction = 'down'
        movePlayer()
        console.log(direction)
        // if (snake + width < width * width) {
        //   snake += width 
        // }
        break
      case 38: if (direction !== 'down') direction = 'up'
        movePlayer()
        console.log(direction)
        // if (snake - width >= 0) {
        //   snake -= width
        // }
        break
      default:
        console.log('player shouldnt move')
    }

    // console.log('current player index is' , snake)
  }

  window.addEventListener('keydown', handleKeyDown)
}
window.addEventListener('DOMContentLoaded', init)