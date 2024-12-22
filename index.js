// Game Constants & variables
let inputDir = {x:0 , y:0};
const foodsound = new Audio('food_G1U6tlb.mp3');
const gameOverSound = new Audio('game-over-38511.mp3');
const moveSound = new Audio('snake-rattle-sound-hq-240150.mp3');
const musicSound = new Audio('retro-game-arcade-236133.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6 , y: 7};

// Start the background music
musicSound.loop = true;  // Loop the background music
musicSound.play();       // Start playing the background music


// Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
}
lastPaintTime = ctime;
gameEngine();
}

function isCollide(snakeArr) {
    // Check if the snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {  // Start from 1, because 0 is the head
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }
    }

    // Check if the snake bumps into the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }

    return false;
}




function gameEngine(){
    // Part 1: Updating the snake array & Food
     if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over. Press any key to play again!")
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        score = 0;
     }

     // If you have eaten the food, increament the score and regenerate the food

     if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y+inputDir.y});
        let a = 2 ;
        let b = 16;
        food = { x: 2+ Math.round(a+(b-a)*Math.random()), y: 2+ Math.round(a+(b-a)*Math.random())}
     }

     // moving the snake
    for (let i = snakeArr.length - 2; i >=0; i--){
        const element = snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]};
         
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

 // **Wrap-around Logic**
 const boardSize = 18; // Assuming 18x18 grid
 if (snakeArr[0].x > boardSize) {
     snakeArr[0].x = 1; // Move to opposite side
 } else if (snakeArr[0].x < 1) {
     snakeArr[0].x = boardSize;
 }

 if (snakeArr[0].y > boardSize) {
     snakeArr[0].y = 1; // Move to opposite side
 } else if (snakeArr[0].y < 1) {
     snakeArr[0].y = boardSize;
 }


    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML ="";
    snakeArr.forEach((e, index) =>{
          snakeElement = document.createElement('div');
          snakeElement.style.gridRowStart = e.y;
          snakeElement.style.gridColumnStart = e.x;
          snakeElement.classList.add('snake');
          if(index === 0){
            snakeElement.classList.add('head');
          }
          else{
            snakeElement.classList.add('snake');
          }
          board.appendChild(snakeElement);
    });
     // Display the food
     foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart = food.x;
     foodElement.classList.add('food');
     board.appendChild(foodElement);
} 
//Start the game loop
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x:0, y:1}// Start the game
    moveSound.play();
    switch(e.key){
       case"ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0 ;
            inputDir.y = -1 ;
            break;
       case"ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0 ;
            inputDir.y = 1 ;
            break;
       case"ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1 ;
            inputDir.y = 0 ;
            break;
       case"ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1 ;
            inputDir.y = 0 ;
            break;
       default:
           break;     
    }
})
