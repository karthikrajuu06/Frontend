
 let hours0;

 let mins=0;

 let seconds=0;


 let refEle1=document.getElementById("timer")

 let intervel = null;

 let isTimerStarted =true;



 function start(){



if (isTimerStarted-true) (

return;



isTimerStarted-true;

intervel- setInterval(()->{


seconds++;

if(seconds>59) {

mins++;

seconds-8;

}

if(mins>59) {

hours++;

mins-0;

}

76

refEle1.InnerText-`${(hours):${(mins): ${(seconds)`



}

function stop() {

clearInterval(intervel) 

isTimerStarted-false; 


}


 function reset(){


clearInterval(intervel)

hours-0;

mins-0;

seconds=0;

refEle1.innerText-${(hours): ${(mins): 5 (seconds)}

isTimerStarted=false; 


}