// http://stackoverflow.com/a/30020693
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;
function reOffset(){
  var BB=canvas.getBoundingClientRect();
  offsetX=BB.left;
  offsetY=BB.top;
}
var offsetX,offsetY;
reOffset();
window.onscroll=function(e){ reOffset(); }

var isDown=false;
var startX,startY,endX,endY;

var rows=7;
var cols=7;
var cellWidth=40;
var cellHeight=40;

var letters = ['g', 'b', 's', 'i', 'c', 'e', 'n', 'o', 'b', 'u', 'w', 'v', 'r', 'd', 'o', 'k', 'i', 't', 'o', 'n', 'd', 'd', 't', 'm', 'c', 't', 'a', 'a', 'h', 'a', 'p', 'y', 's', 'e', 'c', 'k', 'o', 'z', 'b', 'z', 'i', 'r', 'p', 't', 'a', 's', 't', 'e', 's'];

var solutions=[];
solutions.push({start:{col:0,row:0},end:{col:0,row:3},color:'gold',word:'butter',isSolved:false});
solutions.push({start:{col:1,row:0},end:{col:6,row:5},color:'purple',word:'good',isSolved:false});
solutions.push({start:{col:0,row:6},end:{col:6,row:0},color:'green',word:'popcorn',isSolved:false});
solutions.push({start:{col:1,row:6},end:{col:6,row:6},color:'blue',word:'tastes',isSolved:false});
solutions.push({start:{col:3,row:1},end:{col:0,row:4},color:'red',word:'with',isSolved:false});

ctx.lineCap = "round";
ctx.lineWidth=20;
ctx.font='14px verdana';
ctx.textAlign='center';
ctx.textBaseline='middle';

drawLetters(letters);

highlightSolvedWords();

function testSolution(){
  var col0=parseInt(startX/cellWidth);
  var row0=parseInt(startY/cellHeight);
  var col1=parseInt(endX/cellWidth);
  var row1=parseInt(endY/cellHeight);
  for(var i=0;i<solutions.length;i++){
    var s=solutions[i];
    var index=-1;
    if(s.start.col==col0 && s.start.row==row0 && s.end.col==col1 && s.end.row==row1){
      index=i;
    }
    if(s.start.col==col1 && s.start.row==row1 && s.end.col==col0 && s.end.row==row0){
      index=i;
    }
    if(index>=0){
      solutions[index].isSolved=true;
      highlightWord(solutions[index]);
      drawLetters(letters);
    }
  }
}

function highlightSolvedWords(){
  for(var i=0;i<solutions.length;i++){
    var solution=solutions[i];
    if(solution.isSolved){
      highlightWord(solution);
    }
  }
}

function drawLetters(letters){
  ctx.fillStyle='black';
  for(var i=0;i<letters.length;i++){
    var row=parseInt(i/cols);
    var col=i-row*cols;
    ctx.fillText(letters[i],col*cellWidth+cellWidth/2,row*cellHeight+cellHeight/2);
  }
}

function highlightWord(word){
  var x0=word.start.col*cellWidth+cellWidth/2;
  var y0=word.start.row*cellHeight+cellHeight/2;
  var x1=word.end.col*cellWidth+cellWidth/2;
  var y1=word.end.row*cellHeight+cellHeight/2;
  ctx.beginPath();
  ctx.moveTo(x0,y0);
  ctx.lineTo(x1,y1);
  ctx.strokeStyle=word.color;
  ctx.globalAlpha=0.25;
  ctx.stroke();
  ctx.globalAlpha=1.00;
}


function handleMouseDown(e){
  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  startX=parseInt(e.clientX-offsetX);
  startY=parseInt(e.clientY-offsetY);

  // Put your mousedown stuff here
  isDown=true;
}

function handleMouseMove(e) {
  e.preventDefault();
  e.stopPropagation();

  if (!isDown) {
    return;
  }
  endX = parseInt(e.clientX-offsetX);
  endY = parseInt(e.clientY-offsetY);

  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.strokeStyle='#efefef';
  ctx.globalAlpha=0.08;
  ctx.stroke();
  ctx.globalAlpha=1.00;
}

function handleMouseUpOut(e){

  // Put your mouseup stuff here
  isDown=false;

  // tell the browser we're handling this event
  e.preventDefault();
  e.stopPropagation();

  endX=parseInt(e.clientX-offsetX);
  endY=parseInt(e.clientY-offsetY);

  testSolution();
}


$("#canvas").mousedown(function(e){handleMouseDown(e);});
$("#canvas").mousemove(function(e){handleMouseMove(e);});
$("#canvas").mouseup(function(e){handleMouseUpOut(e);});
$("#canvas").mouseout(function(e){handleMouseUpOut(e);});