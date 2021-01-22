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

### 3. game.js

### 4. player.js

### 5. defenders.js

### 6. ball.js

### 7. timer.js

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
