// object variables
var div = document.getElementById('square');
var bef = document.getElementById('haha');

//function variables
function rand(){
  for (var i = 0; i < 20; i++)
    {
      set1[i] = i+1;
      set2[i] = i+21;
    }
  scramble(set1);
  scramble(set2);
}

function scramble(arr) {
  for (var i = 0; i < 100; i++) {
    var in1 = Math.round(Math.random()*19);
    var in2 = Math.round(Math.random()*19);
    var temp = arr[in1];
    arr[in1] = arr[in2];
    arr[in2] = temp;
  }
}



//normal variables
var currentnumber = 1;
var flag = 0;
var set1 = new Array(20);
var set2 = new Array(20);
var seconds=0;
var minutes=0;
var stat=new Date();
var cur= new Date();
var inte;
var score = new Array(5);
//init
function init(){
  for (var i = 1; i <= 20; i++) {
    var btn = document.createElement('button');
    btn.id = i;
    btn.setAttribute('type','button');
    var temp=Math.floor((set1[i-1]/40)*80)+10;
    btn.style.background='hsl(246,66%,'+ temp +'%)';
    var t = 'check('+ i +')';
    btn.setAttribute('onclick',t);
    var txt = document.createTextNode(set1[i-1]);
    btn.appendChild(txt);
    div.insertBefore(btn,bef);
  }
  for (var i = 0; i < score.length; i++) {
    score[i]=0;
  }
}

function check(i){
  console.log("you clicked id "+ i);
  hel = set2[i-1];
  var btn = document.getElementById(i);

  if(btn.textContent==currentnumber)
  {
    if(currentnumber==40){

      clearInterval(inte);
            updatescore();
    }

    if(currentnumber==1)
    {
      start();
      inte = setInterval(time,10);
    }

    if(currentnumber==21)
      flag=1;
    currentnumber=currentnumber+1;
    if (flag==0) {
      //console.log(btn);
      btn.textContent= hel;
      var temp=Math.floor((set2[i-1]/40)*80)+10;
      btn.style.background='hsl(246,66%,'+ temp +'%)';

    } else {
      btn.textContent="-";
        btn.style.color='hsl(246,66%,0%)'
        btn.style.background='hsl(246,66%,0%)';
    }
  }
}


function reset()
{
  console.log(score);
  clearInterval(inte);
  currentnumber=1;
  flag=0;
  rand();
  for (var i = 0; i < 20; i++) {
    var btn = document.getElementById(i+1);
    btn.textContent = set1[i];
    var temp=Math.floor((set1[i]/40)*80)+10;
    btn.style.background='hsl(246,66%,'+ temp +'%)';
  }

  //update scoreboard
  document.getElementById('sec').textContent = "00";
  document.getElementById('min').textContent = "00";
  document.getElementById('milli').textContent = "000";
    console.log(score);
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
  while(sc<score[index] || score[index]==0){
    if(index==0)
    break;
    console.log("index ="+index);
    console.log("score ="+score);
    score[index]=score[index-1];
    index=index-1;
  }
  if(index==0){
    console.log("index(outside loop)="+index);
    console.log("score(outside loop)="+score);
    if(sc<score[index]||score[index]==0)
    score[index]=sc;
    else {
      score[index+1]=sc;
    }
  }
  else
    score[index+1]=sc;
  displayscore();
}

function displayscore(){
  for (var i = 0; i < score.length; i++) {
    var millis=score[i]%1000;
    var seconds=Math.floor(score[i]/1000) % 100;
    var minutes=Math.floor(score[i]/100000);
    var txt = minutes +"."+seconds+"."+millis;
    var temp = document.getElementById('dis'+i);
    temp.textContent=txt;
  }
}



//calling functions
rand();
init();
