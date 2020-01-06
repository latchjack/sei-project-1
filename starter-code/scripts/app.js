function init() {
  //  dom variables
  const grid = document.querySelector('.grid')
  const squares = []
  let direction = null
  const pointCounter = document.querySelector('.points')

  let points = 0
  
  let speed = 400
  // eslint-disable-next-line no-unused-vars
  const timerId = setInterval(movePlayer, speed)

  // game variables
  const width = 15
  // eslint-disable-next-line prefer-const
  let playerLocation = [3, 2, 1]
  // const foodLocation = Math.floor(Math.random() * squares.length)
  
  Array(width * width).join('.').split('.').forEach(() => {
    // create 
    const square = document.createElement('div')
    square.classList.add('grid-item')
    squares.push(square)
    grid.appendChild(square)
  })

  function addPlayer() {
    playerLocation.map(index => squares[index].classList.add('player'))
  }
  addPlayer()

  function removePlayer() {
    playerLocation.map(index => squares[index].classList.remove('player'))
  }
  
  // console.log(playerLocation[0])
  // console.log(squares)

  function newFood() {
    const foodLocation = Math.floor(Math.random() * squares.length)
    squares[foodLocation].classList.add('food')
  }
  newFood()
  // console.log(squares)
  // console.log(squares[playerLocation])
  function speedUp() {
    speed = speed - 50
  }

  function snakeEats() {
    if (squares[playerLocation[0]].classList.contains('food')) {
      squares[playerLocation[0]].classList.remove('food')
      playerLocation.push('4')
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

  // function autoMove() {
  //   playerLocation++
  //   // if (playerLocation % 15 === 1) { 
  //   //   playerLocation = playerLocation - 14 
  //   // }
  // }

  function movePlayer() {
    // console.log(squares[playerLocation[0]])
    if (direction === 'right') {
      removePlayer()
      playerLocation.pop()
      if (playerLocation[0] % width === 14) {
        playerLocation[0] -= 14
      }
      playerLocation.unshift(playerLocation[0] + 1)
      addPlayer()
      // console.log(playerLocation)

    }
    if (direction === 'left') {
      removePlayer()
      playerLocation.pop()
      if (playerLocation[0] % width === 0) {
        playerLocation[0] += 14
      }
      playerLocation.unshift(playerLocation[0] - 1)
      addPlayer()
      // console.log(playerLocation)
    }
    if (direction === 'down') {
      removePlayer()
      playerLocation.pop()
      if (playerLocation[0] >= 210) {
        playerLocation[0] -= 210
      }
      playerLocation.unshift(playerLocation[0] + 15)
      addPlayer()
      // console.log(playerLocation)
    }
    if (direction === 'up') {
      removePlayer()
      playerLocation.pop()
      if (playerLocation[0] <= 14) {
        playerLocation[0] += 210
      }
      playerLocation.unshift(playerLocation[0] - 15)
      addPlayer()
      // console.log(playerLocation)
    }
    snakeEats()
  }
  
  

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 39: if (direction !== 'left') direction = 'right'
        movePlayer()
        console.log(direction)
        // if (playerLocation % width < width - 1) {
        //   console.log(squares[playerLocation])
        //   playerLocation++
        // }
        break
      case 37: if (direction !== 'right') direction = 'left'
        movePlayer()
        console.log(direction)
        // if (playerLocation % width > 0) {
        //   playerLocation--
        // }
        break
      case 40: if (direction !== 'up') direction = 'down'
        movePlayer()
        console.log(direction)
        // if (playerLocation + width < width * width) {
        //   playerLocation += width 
        // }
        break
      case 38: if (direction !== 'down') direction = 'up'
        movePlayer()
        console.log(direction)
        // if (playerLocation - width >= 0) {
        //   playerLocation -= width
        // }
        break
      default:
        console.log('player shouldnt move')
    }

    // console.log('current player index is' , playerLocation)
  }
  
  // if (squares[playerLocation[0]].classList.contains('food')) {
  //   // console.log('food')
  //   squares[playerLocation[0]].classList.remove('food')
  // }

  window.addEventListener('keydown', handleKeyDown)
}
window.addEventListener('DOMContentLoaded', init)