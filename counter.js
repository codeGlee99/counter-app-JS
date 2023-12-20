var container = document.querySelector(".container");
var timer = document.querySelector(".Timer");
var dispTimer = document.querySelector(".displayTimer");


var val = 0;
var currentval = 0;
var arrVal = [];


// **--------increments 0 - 9 and repeat-----------**

function Counter(){

 setInterval(()=>{
    val<9? val++ : val=0;
    currentval = val;
   timer.innerHTML =
   `
   <h1>Starts Counter</h1>
   <h3>${val}</h3>
   `  
     
 },1000);  

}



window.onload = Counter;
container.addEventListener("keydown",getCountVal)

// **-----------Returns the keypressed count--------- **

const displayCountVal=(pressedVal)=>{
   dispTimer.innerHTML =
   `
   <h1>Freezed Values</h1>
   <h3>${pressedVal}</h3>
   `
}

function getCountVal(){
  
   arrVal.push(currentval)
   displayCountVal(arrVal)
   
}

