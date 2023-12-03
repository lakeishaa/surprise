var myGamePiece;
var bottomRightPiece;
var letter;

function startGame() {
  myGamePiece = new component(130, 130, "powerpuff2.PNG", 20, 250);
  bottomRightPiece = new component(
    130,
    130,
    "mailbox.png",
    myGameArea.canvas.width - 200,
    myGameArea.canvas.height - 150
  );
  myGameArea.start();

  myGameArea.canvas.addEventListener("click", handleClick);
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  buttonContainer: document.getElementById("buttonContainer"),

  start: function () {
    this.canvas.width = 900;
    this.canvas.height = 400;
    this.canvas.style.marginTop = "80px"; // Set the top margin
    this.context = this.canvas.getContext("2d");
    this.canvas.style.zIndex = "2"; // Set the z-index to ensure the canvas is on top
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);

    // make this middle
    this.canvas.style.transform = "translate(-50%, -50%)";

    var backgroundImage = new Image();
    backgroundImage.src = "bg.jpeg"; // Replace with the URL of your background image

    backgroundImage.onload = function () {
      myGameArea.context.drawImage(
        backgroundImage,
        0,
        0,
        myGameArea.canvas.width,
        myGameArea.canvas.height
      );
    };
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function component(width, height, imageSrc, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.image = new Image();
  this.image.onload = function () {
    // Draw the image after it has loaded
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };
  this.image.src = imageSrc;

  this.update = function () {
    var ctx = myGameArea.context; // Define ctx here
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };

  this.newPos = function () {
    this.x += this.speedX;
    this.y += this.speedY;
  };
}

function updateGameArea() {
  myGameArea.clear();

  // Display letter on top of mailbox if powerpuff's x position is greater than or equal to 300
  if (myGamePiece.x >= 500) {
    bottomRightPiece.image.src = "letter.png";
  }

  // Always draw powerpuff and mailbox
  myGamePiece.newPos();
  myGamePiece.update();
  bottomRightPiece.update();
}

function moveup() {
  myGamePiece.speedY = -1;
}

function movedown() {
  myGamePiece.speedY = 1;
}

function moveleft() {
  myGamePiece.speedX = -1;
}

function moveright() {
  myGamePiece.speedX = 1;
}

function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

document.addEventListener("DOMContentLoaded", function () {
  myGameArea.buttonContainer = document.getElementById("buttonContainer");

  // Assuming you have a background-container element with the id "background-container"
  var backgroundContainer = document.getElementById("background-container");

  // Apply the transform style
  if (backgroundContainer) {
    backgroundContainer.style.transform = "translate(-50%, -50%)";
  }
  startGame();
});

// Define a variable to store the textarea element
var textareaElement;

function handleClick(event) {
  // Get the coordinates of the click relative to the canvas
  var x = event.clientX - myGameArea.canvas.getBoundingClientRect().left;
  var y = event.clientY - myGameArea.canvas.getBoundingClientRect().top;

  // Check if the click is within the area of the displayed "letter.png"
  if (
    x >= 700 && // Adjust these values based on the position and size of your "letter.png"
    x <= 250 + (myGameArea.canvas.width - 200) &&
    y >= 300 &&
    y <= 200 + 400
  ) {
    // Show a textarea in the middle of the screen
    showTextarea();
  }
}

function showTextarea() {
  // Check if the textarea element already exists
  if (!textareaElement) {
    // Create a new textarea element
    textareaElement = document.createElement("textarea");

    // Get the coordinates of the click relative to the canvas
    var x = event.clientX - myGameArea.canvas.getBoundingClientRect().left;
    var y = event.clientY - myGameArea.canvas.getBoundingClientRect().top;

    // Check if the click is within the area of the displayed "letter.png"
    if (
      x >= 130 && // Adjust these values based on the position and size of your "letter.png"
      x <= 130 + (myGameArea.canvas.width - 200) &&
      y >= 130 &&
      y <= 130 + 400
    ) {
      // Create a div element to act as a clickable area
      var clickableArea = document.createElement("div");
      clickableArea.innerHTML = "Click Me";
      clickableArea.style.cursor = "pointer";
      clickableArea.style.marginTop = "515px"; // Adjust as needed
      clickableArea.style.marginLeft = "625px";
      clickableArea.style.zIndex = "90";
      clickableArea.style.top = "500px"; // Adjust as needed
      clickableArea.style.color = "black";
      clickableArea.style.fontFamily = "'Press Start 2P', cursive";
      clickableArea.style.backgroundColor = "#ffd310";
      clickableArea.style.borderRadius = "6px";
      clickableArea.style.padding = "6px";
      clickableArea.style.width = "130px";
      // clickableArea.style.textAlign = "center";

      // Add an event listener to the clickable area
      clickableArea.addEventListener("click", function () {
        window.location.href = "./surprise/bitch/game/index.html"; // Change this line to handle the navigation
        console.log("Clickable area clicked! Content: ", textareaElement.value);
      });

      // Style the textarea (adjust as needed)
      textareaElement.style.position = "absolute";
      textareaElement.style.left = "950px";
      textareaElement.style.top = "300px";
      textareaElement.style.backgroundColor = "#fcacd3";
      textareaElement.style.border = "2px solid black";
      textareaElement.style.borderRadius = "6px";
      // textareaElement.style.transform = "translate(-50%, -50%)";
      textareaElement.style.width = "160px";
      textareaElement.style.height = "100px";
      textareaElement.style.zIndex = "10";
      textareaElement.value =
        "Dear Allya...\n \n allyaa.... allyaaa... allyaa.. jelek bgt\n \n gue doain lo tahun ini makin cakep cantik pinter sukes \n\nthis avatar is literally you and norman loll\n \n gue seneng bgt udh bisa ke LA for your 21st birthday sampe gue extend my flight just to be there on ur 21st, even though cuman pas paginya doang hehe but now ive gone to LAa and u've gone to NYC and our La La Lost You is complete and full circle\n\ngue doain lo bisa dapet kerja next year bc whyy is my bbBBBbbbBest fren so talented\n \ni hope ur yacht party was fun wish i was there\n \nalso so sorry this is late but i was so stressed w everything (aka my L year)\n \nalso this took so long to code omg i was supposed to work on my finals but i prioritized u ofc HAHAH \n \none day i'll move to the same city as u and we can work in google together or smthg and work on allya lake murphy productions damn cant believe were here now \n \nand because u took me to a basketball game (tysm i had so much fun fr one of my best experiences (CHE EL EE PE PE EH ER ES, kita pasti menang hari ini)).... i think u should go to the CLICK ME for a fun surprise...";

      // Append the textarea and clickable area to the document body
      document.body.appendChild(textareaElement);
      document.body.appendChild(clickableArea);
    }
  }
}
