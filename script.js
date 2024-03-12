const canvas = document.getElementById("game");
canvas.width = 1900;
canvas.height = 900;
const ctx = canvas.getContext("2d");

const swimmer = new Image();
swimmer.src = "./src/image/Hurt2.png";

let xSwimmer = 600;
let ySwimmer = 500;

const speed = 5;

const keys = {
  up: false,
  down: false,
  right: false,
  left: false,
};

const octopus = {
  image: new Image(),
  x: 400,
  y: 300,
};

octopus.image.src = "./src/image/octopu5.png";

octopus.image.onload = () => {
  octopus.image.width *= 2;
  octopus.image.height *= 2;

  window.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowLeft":
        keys.left = true;
        break;
      case "ArrowRight":
        keys.right = true;
        break;
      case "ArrowUp":
        keys.up = true;
        break;
      case "ArrowDown":
        keys.down = true;
        break;
    }
  });

  window.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "ArrowLeft":
        keys.left = false;
        break;
      case "ArrowRight":
        keys.right = false;
        break;
      case "ArrowUp":
        keys.up = false;
        break;
      case "ArrowDown":
        keys.down = false;
        break;
    }
  });

  function update() {
    if (keys.left) {
      xSwimmer -= speed;
    }
    if (keys.right) {
      xSwimmer += speed;
    }
    if (keys.up) {
      ySwimmer -= speed;
    }
    if (keys.down) {
      ySwimmer += speed;
    }

    if (xSwimmer < 0) {
      xSwimmer = 0;
    }
    if (ySwimmer < 0) {
      ySwimmer = 0;
    }

    if (xSwimmer + swimmer.width > canvas.width) {
      xSwimmer = canvas.width - swimmer.width;
    }
    if (ySwimmer + swimmer.height > canvas.height) {
      ySwimmer = canvas.height - swimmer.height;
    }

    if (
      xSwimmer < octopus.x + octopus.image.width &&
      xSwimmer + swimmer.width > octopus.x &&
      ySwimmer < octopus.y + octopus.image.height &&
      ySwimmer + swimmer.height > octopus.y
    ) {
      if (keys.left) {
        xSwimmer = octopus.x + octopus.image.width;
      }
      if (keys.right) {
        xSwimmer = octopus.x - swimmer.width;
      }
      if (keys.up) {
        ySwimmer = octopus.y + octopus.image.height;
      }
      if (keys.down) {
        ySwimmer = octopus.y - swimmer.height;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      swimmer,
      xSwimmer,
      ySwimmer,
      swimmer.width * 3,
      swimmer.height * 3
    );

    ctx.drawImage(
      octopus.image,
      octopus.x,
      octopus.y,
      octopus.image.width,
      octopus.image.height
    );
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  swimmer.onload = () => {
    gameLoop();
  };
};
