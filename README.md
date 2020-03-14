![GA Logo](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
# Software Engineering Immersive: Project 1
This was my first project built whilst studying the Software Engineering Immersive course at General Assembly.

This game was built in one week during Week 4 of the course.

# Snake 2

## Brief
- **Render a game in the browser**
- **Design logic for winning & visually display which player won**
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- Use **Javascript** for **DOM manipulation**
- **Deploy your game online**, where the rest of the world can access it
- Use **semantic markup** for HTML and CSS (adhere to best practices)

## Tech Stack
This project was built using the following technologies.
+ HTML5
+ CSS3
+ JavaScript (ES6)
+ Git & GitHub

## Release History

+ 1.0 - This game will not be updated so as to stay true to the challenge of building it in one week. This also is to serve as a benchmark for how much I have improved since the date (10/01/20) this was submitted. Any improvements stated to be made to it will be done so in a follow up project.

## Deployment
The game is deployed utilising GitHub Pages and it can be found (and played 😉) here via this link - [Snake 2](https://latchjack.github.io/sei-project-1/)

## Getting Started
If you would like to fork/clone this game to your own repository, please feel free to do so. 

You then need to open the index.html file in your browser and the game should start. All images are stored in the games asset folder if you would like to customise the game with your own style.

## Game Architecture
Snake 2 is a single player game. The object of the game is to navigate the grid and eat as many bugs as possible, increasing your score.

![Screenshot of the game](assets/ReadMeFiles/Readme-1.png)

The challenge is to not bump into the body of your snake which becomes more challenging as you accumulate more points, as your snake will grow longer.

Here you can see the snake has grown after eating numerous bugs.
![Screenshot of the game](assets/ReadMeFiles/Readme-2.png)

If the player lets the snake's head touch the rest of the body they will see the game over screen.
![Screenshot of the game](assets/ReadMeFiles/Readme-3.png)

To control the snake the player presses down on the `up, down, left and right` arrow keys on their keyboard to navigate across the 15 x 15 grid whilst getting closer to the bugs.

If a bug is eaten, the player's score will increase. The top score is stored in the browser's cache and once the player beats the last high score it will be replaced with their own.

There are four different bugs the player can eat which all award a different number of points. 

#### Bug 1
![Bug 1](assets/bug0.png)

Worth 15 points

#### Bug 2
![Bug 2](assets/bug1.png)

Worth 20 points

#### Bug 3
![Bug 3](assets/bug2.png)

Worth 25 points

#### Bug 4
![Bug 4](assets/bug3.png)

Worth 30 points

The bugs are randomly generated so the player will never know which bug will appear next. To do this I built a function that uses the `Math.random()` function which can be seen below.

```js
//Function that creates new food for the snake on an availabe square
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
```
When the `newFood` function is invoked, the first step is that it randomly chooses one of the 4 bugs from the `bugs` constant via the `Math.random` function in the `randomBug` constant.

It then runs a filter function on the grid array which is named `squares` and returns all squares that do not contain the class of `player` (the snake's head or body) and places them into the new array `availableSquares`. I then run another `Math.random` function on the available squares so I can randomly choose one of the empty squares so the game isn't predictable.
This is done so that I can make sure the next bug that is generated doesn't appear in a square that is currently occupied.

This isn't a big issue at the beginning of the game the snake can only occupy three squares, however later into the game it would cause many problems if the food were to spawn on a location already occupied by the player. So by having these two random function I am able to avoid any collision issues.

## Challenges and Improvements

### Challenges
The main challenges I had on this project were...
1. Making sure the collision detection for the snake's head worked
2. Ensuring the food (bugs) would only generate on an empty square
3. Handling the movement of the snake

I was able to overcome most of these challenges within our week deadline. However I wasn't able to solve one of the issues within our one week limit.

1. Making sure the collision detection for the snake's head worked

The way I was able to overcome this challenge was by figuring out that I could slice the array that represents the snake. I was then able to check if the square contained any of the other index's of the array when the head of the snake entered the same square. This would then invoke the game over function.

```js
  function collisionCheck() {
    if (snake.slice(1).includes(snake[0])) {
      gameOver()
    }
  }
```

2. Ensuring the food would only generate on an empty square

I figured out how to use the `Math.random()` function for the food to be selected out of the `bugs` array, so I used the same formulae to select a random square on the grid after the food had been eaten. However occassionally the food would spawn on a square that the snake was currently occupying. After some experimentation and discussion with my peers I realised that I could use the filter method on the array to find out which squares were empty and then spawn the food randomly in one of them. The uncommented code in the function below shows how that was done. 

```js
  function newFood() {
    // const bugs = ['bug0', 'bug1', 'bug2', 'bug3']
    // const randomBug = bugs[Math.floor(Math.random() * Math.floor(4))]
    const availableSquares = squares.filter(square => {
      return !square.classList.contains('player')
    })
    const foodLocation = Math.floor(Math.random() * availableSquares.length)
    const squareFood = availableSquares[foodLocation]
    squareFood.classList.add('food')
    squareFood.style.backgroundImage = `url('./assets/${randomBug}.png')`
    squareFood.setAttribute('data-id', randomBug)
  }
```

3. Handling the movement of the snake

The movement of the snake was created by using an event listener for the player's key presses.
When the player pressed down on any of the arrow keys the keycode was then assign the direction name as the variable (as seen in the code below).

The trick to this was also making sure that the snake can't move in reverse as it has to always move forwards. To do this (for instance on the direction of 'right'), when the player hits the Right arrow key for which the keycode is `39`. I check to make sure the snake isn't already moving towards the left with  `if (direction !== 'left')` and invoke the `movePlayer` function. Also on each movement it does a collision check.

```js
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
```
After the `movePlayer` function was invoked on a certain direction the code below would check to see what the direction variable had been set as and then ran the mathematical equation to get the snake to move in that direction.
```js
  function movePlayer() {
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
    }
    if (direction === 'down') {
      removePlayer()
      snake.pop()
      if (snake[0] >= 210) {
        snake[0] -= 210
      }
      snake.unshift(snake[0] + 15)
      addPlayer()
    }
    if (direction === 'up') {
      removePlayer()
      snake.pop()
      if (snake[0] <= 14) {
        snake[0] += 210
      }
      snake.unshift(snake[0] - 15)
      addPlayer()
    }
    snakeEats()
    collisionCheck()
  }
```
The issue I came across with this was that the snake moves as expected until it gets to the edge of the grid when it is meant to appear from the other side. The head of the snake comes out on the right line but as soon as it does the next segment of the body disappears whilst the snake passes through the wall. You can see a GIF of the issue below

First the snake approaches the edge of the grid. It should appear from the other side on the same line.
As the snake's head passes through to the other side we can see that the next segment of the body disappears leaving an empty square.

![error gif](https://media.giphy.com/media/VbhO8XUmpLRDUcIaH9/giphy.gif)

I did a lot of debugging but I wasn't able to figure out why this was happening. I came to the conclusion that it may be because I had to seperate functions that handled the movement of the snake.


### Improvements
The improvements I would like to make on this game would be the following...

1. Fixing the disappearing segment when the snake goes through the wall
2. Making the game mobile responsive so it adjusts to mobile displays and listens for touchscreen presses.
3. Applying a countdown timer for how long a bug is displayed on the screen to make it more exhilarating. After thinking about it, I realised that some players would be able to achieve a higher score than others. This is because the bugs are randomly generated meaning some lucky players may have more bugs spawn that are worth more than ones that spawn for other players. By making them harder to catch I thought it might even out the chances for everyone who played.
4. Add some more bugs. Possibly even some that are rarer and only appear every so often.
5. Combine the two functions that handle movement into one clean function.

#### Author
Latch Jack - You can contact me via [Twitter](https://twitter.com/LatchCodes "My twitter profile") or via [email](mailto:latch.jack@gmail.com "my email").

Thank you for reading / playing / visiting my repository! :)