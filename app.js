const canvas = document.getElementById('canvas');
const ghostCanvas = document.getElementById('ghost-canvas');
let offset = canvas.getBoundingClientRect();

const clearButton = document.getElementById('clear-btn');
let snakeBtn = document.getElementById('snake-btn');
let eraserBtn = document.getElementById('erase-btn');
let undoBtn = document.getElementById('undo-btn');
let vortexBtn = document.getElementById('dimensional-vortex-btn');
let penBtn = document.getElementById('pen-btn');

let squareBtn = document.getElementById('square-btn');
let triangleBtn = document.getElementById('triangle-btn');
let circleBtn = document.getElementById('circle-btn');

let redSlider = document.getElementById('red-sld');
let blueSlider = document.getElementById('blue-sld');
let greenSlider = document.getElementById('green-sld');
let fontSlider = document.getElementById('fnt-sld');

let redSliderText = document.getElementById('redSliderText');
let blueSliderText = document.getElementById('blueSliderText');
let greenSliderText = document.getElementById('greenSliderText');

//document.body.style.backgroundColor = '#218854';

update = (slider) => slider.value;



let width = .75 * window.innerWidth;
let height = .8 * window.innerHeight;

function setCanvas(canvas){
canvas.width = width;
canvas.height = height;
}


setCanvas(canvas);
setCanvas(ghostCanvas);

let ctx = canvas.getContext('2d');
let ghostContext = ghostCanvas.getContext('2d');


redSliderText.value = redSlider.value;
blueSliderText.value = blueSlider.value;
greenSliderText.value = greenSlider.value;

// ctext.fillStyle = "#2DDFE7";
// ctext.fillRect(0, 0, btnCanvas.width, btnCanvas.height);
let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);


var c = document.getElementById("myCanvas");
const centerX = (c.width / 2) - 15;
const centerY = c.height / 2;
const radius = 55;
var contx = c.getContext("2d");

function setRGB(red, green, blue){
    redSlider.value = red;
    greenSlider.value = green;
    blueSlider.value = blue;

    redSliderText.value = red;
    greenSliderText.value = green;
    blueSliderText.value = blue;

    drawCircle(contx, centerX, centerY, radius);
}
let pos = {
    x: 0,
    y: 0
};

function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;
   
    while (el) {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition
    };
}   

function whiteCanvas(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}



function resize() {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

function setMousePosition(e) {
    if (e.buttons === 1) {
        ghostContext.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    mouseX = e.clientX - canvasPos.x;
    mouseY = e.clientY - canvasPos.y;

    const radius = parseInt(fontSlider.value) / 2;
    let sideLength = parseInt(fontSlider.value);

    ghostContext.clearRect(0, 0, canvas.width, canvas.height);
    if (squareBtn.value === 'On'){
        drawSquare(ghostContext, mouseX, mouseY, sideLength);
    }
    else if (triangleBtn.value === 'On'){
        drawTriangle(ghostContext, mouseX, mouseY, sideLength);
    }
    else {
        drawEmptyCircle(ghostContext, mouseX, mouseY, radius);

    }

}

function snakeShape(){
    let centerX = pos.x;
    let centerY = pos.y;
    const radius = parseInt(fontSlider.value) / 2;
    let sideLength = parseInt(fontSlider.value);

    if (snakeBtn.value ===  'Off') return;
    
    if (squareBtn.value == 'On'){
        canvasSquare(ctx, centerX, centerY, sideLength);
    }
    else if (triangleBtn.value === 'On'){
        canvasTriangle(ctx, centerX, centerY, sideLength);
    }
    else {
        canvasCircle(ctx, centerX, centerY, radius);
    }

}

function canvasCircle(ctx, centerX, centerY, radius){
    drawCircle (ctx, centerX, centerY, radius);
    ctx.lineWidth = 1;
    ctx.stroke();
}

function canvasSquare(canvas, centerX, centerY, sideLength){
    drawSquare(canvas, centerX, centerY, sideLength);
    canvas.lineWidth = 1;
    canvas.stroke();
    fillShape(canvas);
}

function canvasTriangle(canvas, centerX, centerY, sideLength){
    drawTriangle(canvas, centerX, centerY, sideLength);
    canvas.lineWidth = 1;
    canvas.stroke();
    fillShape(canvas);
}

function dimensionalVorexPosition(e) {
    if (e.buttons !== 1) return;

    if (vortexBtn.value === 'On'){
        mouseX = e.clientX - canvasPos.x;
        mouseY = e.clientY - canvasPos.y;

        const radius = parseInt(fontSlider.value) / 2;
        const sideLength = parseInt(fontSlider.value);
        if (squareBtn.value === 'On'){
            drawSquare(ctx, mouseX, mouseY, sideLength);
        }
        else if (triangleBtn.value === 'On'){
            drawTriangle(ctx, mouseX, mouseY, sideLength);
        }
        else {
            drawEmptyCircle(ctx, mouseX, mouseY, radius);
    
        }

    }
}
let pixelArray = [];
let value = 0;

function drawTriangle(canvas, x, y, size) {
    let height = (size / 2) * Math.sqrt(3);
    let posX = x - size / 2;
    let posY = y - Math.sqrt(3)*(size / 4) + size / 2;
    canvas.beginPath();
    canvas.moveTo(posX, posY);
    canvas.lineTo(posX + size, posY);
    canvas.lineTo(posX + (size / 2), posY - height);
    canvas.lineTo(posX, posY);
  
    canvas.lineWidth = 1;
    canvas.strokeStyle = "rgb("+ redSlider.value +","+ greenSlider.value
    +","+ blueSlider.value +")";
    canvas.stroke();
}

function drawEmptyCircle(canvas, x, y, radius){
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * Math.PI, true);
    canvas.lineWidth = 1;
    canvas.strokeStyle = "rgb("+ redSlider.value +","+ greenSlider.value
    +","+ blueSlider.value +")";
    canvas.stroke();
}

function drawCircle (canvas, x, y, radius){
    canvas.beginPath();
    canvas.arc(x, y, radius, 0, 2 * Math.PI, false);
    canvas.fillStyle =  "rgb("+ redSlider.value +","+ greenSlider.value
    +","+ blueSlider.value +")";
    canvas.fill();
}

function drawSquare(canvas, x, y, size){
    canvas.beginPath();
    canvas.rect(x, y, size, size);
    canvas.lineWidth = 2;
    canvas.strokeStyle =  "rgb("+ redSlider.value +","+ greenSlider.value
    +","+ blueSlider.value +")";
    canvas.stroke();
}



function colorCircle() {
    contx.lineWidth = 1;
    contx.strokeStyle = '#000000';
    contx.stroke();
}

function fillCircle(e){
    if (e.buttons !== 1) return;

    fillShape(contx);
}

function fillShape(canvas){
    canvas.fillStyle =  "rgb("+ redSlider.value +","+ greenSlider.value
     +","+ blueSlider.value +")";
    canvas.fill();
}

const clear = function (){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
    whiteCanvas();
}

function onOff(btn) {
    if (btn.value === 'Off')
        btn.value = 'On';
    else
        btn.value = 'Off';
}
 
let buttons = [snakeBtn, vortexBtn, eraserBtn, penBtn];

function turnOffLastButton(btn, buttons){
    for (let i = 0; i < buttons.length; i++){
        if(buttons[i] !== btn){
            buttons[i].value = 'Off';
            buttonClick(buttons[i]);
        }
    }
}

function turnOffShapeButtons(){
    if (snakeBtn.value === 'Off'
    && vortexBtn.value === 'Off'){
        for (let i = 0; i < shapeButtons.length; i++){
            if (shapeButtons[i].value === 'On'){
                onOff(shapeButtons[i]);
                buttonClick(shapeButtons[i]);
            }
        }
    }
}
if (penBtn.value === 'On' ){
    penBtn.style.backgroundColor = '#eb349b';
}

function buttonClick(btn) {
    if (btn.value === 'On' ){
        btn.style.backgroundColor = '#eb349b';
    }
    else if (btn.value === 'Off')
        btn.style.backgroundColor = '#97256D';
}

whiteCanvas();
drawCircle(contx, centerX, centerY, radius);


function fullButtonHandler(btn){
    turnOffLastButton(btn, buttons);
    onOff(btn);
    if ((snakeBtn.value === 'On' || vortexBtn.value === 'On') 
        && circleBtn.value === 'Off')
        shapeButtonHandler(circleBtn);
    buttonClick(btn);
}

function shapeButtonHandler(btn){
    if (snakeBtn.value === 'On' 
    || vortexBtn.value === 'On'){
        onOff(btn);
        buttonClick(btn);
        turnOffLastButton(btn, shapeButtons);
    }
}

function eraser() {
    if (eraserBtn.value === 'On' && snakeBtn.value !== 'On')
    {
        ctx.strokeStyle = '#FFFFFF';
    }
    else if (snakeBtn.value === 'On' && eraserBtn.value !== 'On'){
        document.addEventListener('mousemove', snakeShape);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#FFFFFF';
    }
    else {
        ctx.strokeStyle =  "rgb("+ redSlider.value +","+ greenSlider.value
        +","+ blueSlider.value +")"; 
    }
}
let canvasOffsetX = canvas.offsetLeft;
let canvasOffsetY = canvas.offsetTop;

function setPosition(e){
    pos.x = e.clientX - canvasOffsetX ;
    pos.y = e.clientY - canvasOffsetY ;
}

function draw(e){
    if (e.buttons !== 1 || vortexBtn.value === 'On' ) {
        return;
    }
    
    ctx.beginPath();
    
    ctx.lineWidth = fontSlider.value;
    ctx.lineCap = 'round';
    eraser();
    ctx.moveTo(pos.x, pos.y);
    setPosition(e);
    ctx.lineTo(pos.x, pos.y);

    ctx.stroke();
}


// start of undo button functions

let mouseLog = [];
let count = 0;
let bigBigArray = [];

let undoArrayValue = [];
let anotherArray = [];


function arrayEraser(arr){
    arr = [];
}

undoArray = [];

function clickChecker(){
    undoArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function undo(){
    if (undoArray.length === 1){
        clear();
        undoArray.pop(undoArray.length - 1);
    }
    else {
        let last = undoArray.length - 2;
        ctx.putImageData(undoArray[last], 0, 0);
        undoArray.pop(undoArray.length - 1);
        console.log(last);
    }
}

// end of undo button functions


eraserBtn.addEventListener('click', function () {
    fullButtonHandler(eraserBtn);
    turnOffShapeButtons();
});

penBtn.addEventListener('click', function () {
    fullButtonHandler(penBtn);
    turnOffShapeButtons();
});

snakeBtn.addEventListener('click', function () {
    fullButtonHandler(snakeBtn);
});
vortexBtn.addEventListener('click', function () {
    fullButtonHandler(vortexBtn);
});

let shapeButtons = [triangleBtn, squareBtn, circleBtn];

squareBtn.addEventListener('click', function(){
    shapeButtonHandler(squareBtn);
});

triangleBtn.addEventListener('click', function(){
    shapeButtonHandler(triangleBtn);
});

circleBtn.addEventListener('click', function(){
    shapeButtonHandler(circleBtn);
});

undoBtn.addEventListener('click', function(){
    undo();
});

clearButton.addEventListener('click', function(){
    clear();
    undoArray.splice(0, undoArray.length);
});
window.addEventListener('resize', resize);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mousemove', draw);
ghostCanvas.addEventListener('click', clickChecker);

document.addEventListener('mousemove', dimensionalVorexPosition);

redSlider.addEventListener('input', function ()
{
    update(redSlider);
    redSliderText.value = redSlider.value;
});
redSlider.addEventListener('mousemove', fillCircle);
let redSliderRefresh = update(redSlider);
redSliderRefresh;
blueSlider.addEventListener('input',  function ()
{
    update(blueSlider);
    blueSliderText.value = blueSlider.value;
});
blueSlider.addEventListener('mousemove', fillCircle);
let blueSliderRefresh = update(blueSlider);
blueSliderRefresh;
greenSlider.addEventListener('input', function ()
{
    update(greenSlider);
    greenSliderText.value = greenSlider.value;
});
greenSlider.addEventListener('mousemove', fillCircle);
let greenSliderRefresh = update(greenSlider);
greenSliderRefresh;

var canvasPos = getPosition(ghostCanvas);
var mouseX = 0;
var mouseY = 0;

ghostCanvas.addEventListener("mousemove", setMousePosition);
ghostCanvas.addEventListener("mouseout", function (){
    ghostContext.clearRect(0, 0, canvas.width, canvas.height);
});
ghostCanvas.addEventListener('mouseleave', function (e){
    if (e.buttons !== 1) return;
    clickChecker();
})

clrs[0].addEventListener("click", () => {
    setRGB(0, 0, 0);
});

clrs[1].addEventListener("click", () => {
    setRGB(255, 0, 0);
});

clrs[2].addEventListener("click", () => {
    setRGB(255,69,0);
});

clrs[3].addEventListener("click", () => {
    setRGB(0, 0, 255);
});

clrs[4].addEventListener("click", () => {
    setRGB(128,0,128);
});

clrs[5].addEventListener("click", () => {
    setRGB(0, 128, 0);
});

clrs[6].addEventListener("click", () => {
    setRGB(255, 255, 0);
});

eraser(eraserBtn);
eraser(snakeBtn);