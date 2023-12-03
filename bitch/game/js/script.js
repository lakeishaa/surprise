var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 25;
var x = canvas.width / 2; // Updated initialization
var y = canvas.height - 30; // Updated initialization
var dx = 2;
var dy = -2;

canvas.style.top = "100px";
canvas.style.backgroundColor ="#255fff";

document.addEventListener("DOMContentLoaded", function () {
  if (canvas) {
    // ... (rest of your code remains unchanged)
  } else {
    console.error("Canvas element not found.");
  }
});


document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("myCanvas");

  if (canvas) {
    // ... (rest of your code remains unchanged)

    var clickMeElement = document.getElementById("clickme");

    if (clickMeElement) {
      // Set the new left position
      clickMeElement.style.left = "500px";
      // Use transform to center the element horizontally
      // clickMeElement.style.transform = "translateX(-50%)";
    } else {
      console.error("Element with ID 'clickme' not found.");
    }
  } else {
    console.error("Canvas element not found.");
  }
});

// Create an Image object and set its source to your PNG file
var ballImage = new Image();
ballImage.src = "powerpuff.PNG"; // Replace with the actual path to your PNG file
//WOYYYY
// Create an array of Image objects for each brick
var brickImages = [
  // "kawhi.jpeg", // Replace with the actual path to your brick1.png file
  // "/images/curry.jpeg", // Replace with the actual path to your brick2.png file
  // Add more paths as needed
  // "/images/westbrook.png",
  // "/images/george.png",
  // "/images/seth.png",
  // "/images/powell.png",
  // "/images/morant.png",
  // "/images/kawhi.png",
  // "/images/harden.png",
  // "/images/luka.png",
  // "/images/kyrie.png",
  // "/images/giannis.png",
  // "/images/kyrie.png",
  // "/images/giannis.png",
  "luka.png",
  "giannis.png",
  "kyrie.png",
  "curry.png",
  "george.png",
  "harden.png",
  "kawhi.png",
  "morant.png",
  "powell.png",
  "seth.png",
  "westbrook.png",
  "lebron.png",
  "klay.png",
  "poole.png",
  "melo.png",
];

// Convert the array of paths into an array of Image objects
var brickImageObjects = brickImages.map(function (path) {
  var img = new Image();
  img.src = path;
  return img;
});

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 50;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if (e.code == "ArrowRight") {
    rightPressed = true;
  } else if (e.code == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.code == "ArrowRight") {
    rightPressed = false;
  } else if (e.code == "ArrowLeft") {
    leftPressed = false;
  }
}
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("CONGRATULATIONS YOU HAVE SURPASSED YOUR IDOL! ");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ca2e3b";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#ffd310";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        // Draw the appropriate image for this brick
        var currentBrickImage =
          brickImageObjects[c * brickRowCount + r] || brickImageObjects[0];
        ctx.drawImage(
          currentBrickImage,
          brickX,
          brickY,
          brickWidth,
          brickHeight
        );
      }
    }
  }
}
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ca2e3b";
  ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ca2e3b";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER \n AYO ALL BISA ALL COBA LAGI ALL \n AH EL EL YE AH RAM LY, KITA PASTI MENANG HARI INI");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

function drawBall() {
  // Draw the PNG image at the specified coordinates
  ctx.drawImage(
    ballImage,
    x - ballRadius,
    y - ballRadius,
    ballRadius * 2,
    ballRadius * 2
  );
}

draw();
