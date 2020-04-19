const canvas = document.querySelector("#jsCanvas"),
  ctx = canvas.getContext("2d"),
  colors = document.getElementsByClassName("jsColor"),
  range = document.getElementById("jsRange"),
  mode = document.getElementById("jsMode"),
  saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c",
  CANVAS_SIZE = 400;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 0.1;

let painting = false,
  filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX,
    y = event.offsetY;
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCanvasClink() {
  if(filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeMove(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if(filling === true) {
    filling = false;
    mode.innerText = "fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "우리밋_img😤";
  link.click();
}

function init() {
  if(canvas) {
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClink);
    canvas.addEventListener("contextmenu", handleCM);
  }
  
  if(colors) {
    Array.from(colors).forEach((color) => {
      color.addEventListener("click", handleColorClick);
    })
  }

  if(range) {
    range.addEventListener('input', handleRangeMove);
  }

  if(mode) {
    mode.addEventListener('click', handleModeClick);
  }

  if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
  }
}

init();