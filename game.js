// object variables
var div = document.getElementById('square');
var right = new Audio("right.wav");
var wrong = new Audio("wrong.wav");

//function variables
function rand(){

  for(var i =1;i<=40;i++){
    set1[i-1]=i;
  }
  scramble(limit*rows,set1);
}

function scramble(n,arr) {


  var times= 40/n;
  for(var i=0;i<times;i++){
    for(var j=0;j<50;j++){
      var in1 = Math.floor(Math.random()*(n));
      var in2 = Math.floor(Math.random()*(n));
      var temp = arr[i*n+in1];
      arr[i*n+in1] = arr[i*n+in2];
      arr[i*n+in2] = temp;
    }
  }



}



//normal variables
var currentnumber = 1;
var flag = 0;
var set1 = new Array(40);
var actualflag=0;
var seconds=0;
var minutes=0;
var stat=new Date();
var cur= new Date();
var inte;
var score = new Array(4,5);
var limit;
var rows;
var layercount = 0;
var maxlayer;
var modeup;
//init



function init(mode){
  modeup=mode;
if(actualflag==1){
  reset();
}
  //remove previous buttons
  while(div.firstChild){
    div.removeChild(div.lastChild);
  }

  if(mode==1){
    limit=5;
    rows=4;
  }
  if(mode==2){
    limit=4;
    rows=2;
  }
  if(mode==3){
    limit=2;
    rows=2;
  }
  var cs = document.getElementById('square');
  if(mode==1){
      cs.style.width="400px";
      cs.style.setProperty("grid-template-columns","repeat(5,1fr)");
  }
  if(mode==2){
    cs.style.width="320px";
    cs.style.setProperty("grid-template-columns","repeat(4,1fr)");
  }
  if(mode==3){
    cs.style.width="160px";
    cs.style.setProperty("grid-template-columns","repeat(2,1fr)");
  }

  rand();

  for (var i = 1; i <= limit*rows; i++) {
    var btn = document.createElement('button');
    btn.id = i;
    btn.setAttribute('type','button');
    var temp=Math.floor((set1[i-1]/40)*80)+10;
    btn.style.background='hsl(246,66%,'+ temp +'%)';
    var t = 'check('+ i +')';
    btn.setAttribute('onclick',t);
    var txt = document.createTextNode(set1[i-1]);
    btn.appendChild(txt);
    div.appendChild(btn);
  }

  //var init
  layercount=0;
  maxlayer=40/(limit*rows);
  displayscore();
}


function check(i){

;
  var btn = document.getElementById(i);

  if(btn.textContent==currentnumber)
  {
    right.play();
    if(currentnumber==40){

        clearInterval(inte);
        updatescore();
        actualflag=0;
    }

    if(currentnumber==1)
    {
      start();
      inte = setInterval(time,10);
      actualflag=1;
    }

    if((currentnumber-1)%(limit*rows)==0 && currentnumber!=1)
      layercount++;
    currentnumber=currentnumber+1;
    flag=(layercount+1)*limit*rows;

    if ((layercount+1)!=maxlayer) {

      btn.textContent=set1[flag+i-1];
      var temp=Math.floor((set1[flag+i-1]/40)*80)+10;
      btn.style.background='hsl(246,66%,'+ temp +'%)';

    } else {
      btn.textContent="-";
        btn.style.color='hsl(246,66%,0%)'
        btn.style.background='hsl(246,66%,0%)';
    }
  }
  else
  wrong.play();
}


function reset()
{

  clearInterval(inte);
  //updatescore();
  currentnumber=1;
  //flag=0;
  rand();
  for (var i = 0; i < limit*rows; i++) {
    var btn = document.getElementById(i+1);
    btn.textContent = set1[i];
    var temp=Math.floor((set1[i]/40)*80)+10;
    btn.style.background='hsl(246,66%,'+ temp +'%)';
  }

  //update scoreboard
  document.getElementById('sec').textContent = "00";
  document.getElementById('min').textContent = "00";
  document.getElementById('milli').textContent = "000";

  //update scoreboard
}



function time(){
  cur = new Date();
  var currr = cur.getTime()-stat.getTime();
  var millis = currr % 1000;
  currr = Math.floor(currr/1000)
  var minutes = Math.floor(currr / 60);
  var seconds = currr%60;
  document.getElementById('sec').textContent = seconds;
  document.getElementById('min').textContent = minutes;
  document.getElementById('milli').textContent = millis;
}

function start(){
  stat = new Date();

}

function updatescore(){
  var sc=0;
  sc=sc+1000*parseInt(document.getElementById('sec').textContent,10);
  sc=sc+100000*parseInt(document.getElementById('min').textContent,10);
  sc=sc+parseInt(document.getElementById('milli').textContent,10);
  var index=4;
  while(sc<score[modeup*5 +index] || score[modeup*5 +index]==0){
    if(index==0)
    break;

    score[modeup*5 +index]=score[modeup*5 +index-1];
    index=index-1;
  }
  if(index==0){

    if(sc<score[modeup*5 +index]||score[modeup*5 +index]==0)
    score[modeup*5 +index]=sc;
    else {
      score[modeup*5 +index+1]=sc;
    }
  }
  else
    score[modeup*5 +index+1]=sc;
  updatelocal();
  displayscore();
}

function displayscore(){
  for (var i = 0; i < 5; i++) {
    var millis=score[modeup*5 +i]%1000;
    var seconds=Math.floor(score[modeup*5 +i]/1000) % 100;
    var minutes=Math.floor(score[modeup*5 +i]/100000);
    var txt = minutes +"."+seconds+"."+millis;
    var temp = document.getElementById('dis'+i);
    temp.textContent=txt;
  }
}


function updatelocal(){
  for(var i =5; i<20;i++){
    localStorage.setItem("score"+i,score[i]);
  }
}

function loaddata(){
  for (var i = 5; i <20; i++) {
    score[i]=localStorage.getItem("score"+i);
  }
}
//calling functions

init(1);

for(var i=0;i<4;i++){
  for(var j=0;j<5;j++){
    score[i*5+j] = 0;
  }
}

loaddata();
displayscore();
