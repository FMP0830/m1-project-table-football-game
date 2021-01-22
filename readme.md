# TABLE FOOTBALL SCORING GAME

## Description

This is a lite version of a table football game using HTML, CSS, JS & JS Canvas.
The main objective is the game is easy:

- Score as many goals as you can in 5 minutes.

## MVP (DOM - CANVAS)

A player that can be moved in four directions using the _arrow buttons_ in your keyboard has to get the ball, which is in a random place near him.
Once he has it, you can move with it and shoot in a straight line pressing _space_.
If it hits on a defender or goes out of the field, the ball will reappear in a random place on the player's side of the field.

If it goes in the goal without touching any other player, you score a goal.
You can repeat this process as many times as you can in 5 minutes.

## Backlog

## Data structure

1. index.html
2. main.js
3. game.js
4. player.js
5. defenders.js
6. ball.js
7. timer.js

### 1. index.html

### 2. main.js
Functions required:
1. buildDOM(string) {}: Should take a string of hardcoded HTML, create an element and append it to the DOM

2. createSplashPage () {}: Uses Build DOM function to generate the main screen. Includes 1 button to create Game Screen and one to go to Info screen.
  - removeSplashPage: Clears the DOM in order to create another screen with the buildDOM function.

3. createInfoScreen () {} Uses Build DOM function to generate page. Contains tutorial and a button to return to splash page.
  - removeInfoScreen () {} Clears the DOM in order to create another screen with the buildDOM function.

4. createGameScreen () {} Uses Build DOM function to generate the game screen and starts the game. When timer runs out, DOM gets cleared and End Game Screen is created
  - removeGameScreen () {} Clears the DOM in order to create another screen with the buildDOM function.

5. createEndGameScreen () {} Uses Build DOM function to generate the end Screen. Contains end result and highest score stored in localStorage. Includes 1 button to restart the game (clears the screen and generates Game Screen again)
  - removeEndGameScreen () {} Clears the DOM in order to create another screen with the buildDOM function.

### 3. game.js
1. Includes 1 Game class with the canvas, player, defenders, goalkeeper, ball, gameIsOver, timer and null properties.

Includes 5 methods:

- Start: includes the following commands:
  - Generates canvas container and dimensions.
  - Generated timer and score elements.
  - Generates a Player instance.
  - Adds event listener on keydown to allow player movement.

- Start Loop: generates game animation.
  - Updates player and defender states.
  - Moves defenders up & down at random speed.
  - Updates ball position animation after a shot.
  - Checks for collissions of the ball instance.
  - Handles the collission logic.
  - Clears the canvas.
  - Updates the canvas (player position, ball position, defenders position).
  - Terminates the loop if game is over.
  - Updates stats (time and score).
  - uses window.requestAnimationFrame.

- Check Collisions
  - Handles ball collision logic. The are 3 scenarios:
    - Ball collides with a defender or goalkeeper: ball is removed and a new instance is created.
    - Ball collides with canvas margin outside of the goal frame: ball is removed and a new instance is created.
    - Ball collides with canvas margin inside of the goal frame: one point is added to score, ball is removed and a new instance is created.

- Game Over
  - Takes timer object and returns "true" to stop the loop if time is equal to 00:00
  - Ends game and updates Game Screen to End Game Screen to show results

- Update Game Status
  - Checks score value and updates it.
  - Checks timer value and updates it.

### 4. player.js
- Includes a player class
- One instance of the class is created per game
- Gets created in a fixed position at the top left corner of the screen
- Has a method bound to keydown events to move in 4 directions (up, down, left & right)
- Has a checkCollision method with 2 possible scenarios:
  - The player cannot move outside its half of the field. If the player reaches a boundary, it cannot move forward
  - If the player collides with the ball, the ball position is modified to become the same as the player's (so they move together)
  - If there is a collision with the ball, the player can call the shoot method, which triggers a move animation for the ball


### 5. defenders.js
- Includes a Defender class
- Creates four instances of the class
- They get drawn and placed in the canvas
- They move in a linear direction up & down the screen.
- Once they collide with the top & low margins of the screen, they change direction
- Their position is updated on every requestFrameAnimation.

-Includes a Goalkeeper class that extends from the defender class.
- Their method to update the position is different from the defenders so they move in a smaller range

### 6. ball.js
- Can create ball objects of a Ball class
- The position is randomly selected within the left half of the canvas
- Has a method to trigger a linear movent by increasing the X axis position
- Once there is a collision with the player, the ball position becomes the same as the player position, and is updated accordingly

### 7. timer.js
- Creates an instasnce of Timer class.
- Timer is a decreasing counter in a 1 second interval.
- Has methods to return minutes and seconds in 2 digit format values according to counter value
- Returns both values so they can be printed into the dom.
- Once it reaches 0, turns the gameOver flag into true, calls endGame and createEndGame methods.

## States and States Transitions

- splashScreen
  - Start the game
  - Goes to gameScreen when _Start_ button is clicked
  - Goes to infoScreen when _Info_ button is cliked
- gameScreen
  - Game running while Countdown > 0
  - Goes to gameEndScreen when Countdown === 0
- gameEndScreen
  - Shows \_Time's Up_message, this session's score and highest score
  - Goes back to gameScreen when _Retry_ button is clicked
- infoScreen
  - Shows game instructions in text
  - Goes back to splashScreen when _Back to main screen_ button is clicked

## Task

- Setup git & GitHub
- Create and connect files: index.html, style.css, main.js, game.js, player.js, defender.js, ball.js, timer.js
- Build Canvas in Dom in main.js
- Create 3 main screens in main.js
- Create info screen in html
- Create general common stylings: background image, text color, buttons.
- Create Game constructor
- Create Player constructor
- Create Defender constructor and Goalie constructor extending from Defender
- Create animation in Defender and Goalie instances to make them move up & down in defender.js
- Create Ball Constructor
- Create animation method in Ball Constructor to represent shooting in ball.js
- Check collisions between Ball instance and Defender Instances in game.js
- Check collisions beween Ball and Goal area to add points to score in game.js
- Create scoreboard and print it in DOM with goal data in main.js
- Create Timer constructor and print it to DOM in timer.js
  - End game when Time === 0.
- Add audio effects to game:
  - Whistle when clicking on buttons
  - Rumbling noise during game
  - "oooh" scream when ball & defender collision
  - joy scream when scoring
  - Whistle on Timer === 0

## Links

### Trello

[Link url](https://trello.com/b/BGXV3vrV/m1project)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/FMP0830/m1-project-table-football-game)
[Link Deploy](http://github.com)

### Slides

URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
