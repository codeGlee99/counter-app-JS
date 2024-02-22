var container = document.querySelector(".container");
var timer = document.querySelector(".Timer");
var dispTimer = document.querySelector(".displayTimer");
var winner = document.querySelector(".team_Winner");

var val = 0;
var currentval = 0;
var arrVal = [];

var teams = [];
var teamCount = 2;
let tm = 0;

var players = [];
var playersCount = 10;
var plyr = 0;

var tmScore = 0;
var totBall = 0;
console.log(totBall,"tottt")

// **--------increments 0 - 6 and repeat-----------**

function Counter() {
  let interval = setInterval(() => {
    val < 6 ? val++ : (val = 0);
    currentval = val;

    timer.innerHTML = `
        <h1>Starts Counter- ${val} </h1> 
      `;

    if (tm >= teamCount) {
      clearInterval(interval);
      generateWinner();
    }
  }, 1000);
}

window.onload = Counter;
container.addEventListener("keydown", getCountVal);

// **-----------Returns the keypressed count--------- **

const displayCountVal = (pressedVal) => {
  let val = pressedVal == "W" ? "OUT" : "Runs :" + pressedVal;

  dispTimer.innerHTML = `  
   <h1> ${val} </h1>
   `;
};

function getCountVal() {
  if (teams[tm].players.length <= playersCount) {
    currentval === 3 || currentval === 5
      ? (arrVal.push("W"),
        displayCountVal("W"),
        getSummary(arrVal),
        arrVal.splice(0, arrVal.length))
      : (arrVal.push(currentval), displayCountVal(arrVal));
  }
}

// --------------------------------------------------------------------------------------------------------------------

for (let i = 0; i < teamCount; i++) {
  teams.push({ TotalBalls: 0, TeamScore: 0, players: [] });
}

function getSummary(arr) {

  if (plyr < playersCount && tm < teamCount) {
    
    teams[tm].players[plyr] = {
      id: plyr + 1,
      player: arr.slice(),
      score: 0,
      balls: 0,
    };
    // teams[tm].players[plyr].player = arr.slice();

    arr.pop();
    arr.push(0);

    teams[tm].players[plyr].score = arr.reduce((accumlator, currentValue) => {
      return accumlator + currentValue;
    });
    teams[tm].players[plyr].balls = arr.length;
    tmScore += teams[tm].players[plyr].score;
    totBall += teams[tm].players[plyr].balls;

    let itm = tm + 1;
    let py = plyr + 1;

    var teamDetail = document.querySelector(`.teamDetail${itm}`);
    var teamSummary = document.createElement("div");
    teamSummary.className = `.teamSummary${py}`;
    teamDetail.appendChild(teamSummary);
    var teamScore = document.querySelector(`.teamSmry${itm}`);

    teamSummary.innerHTML += `
     <div>${teams[tm].players[plyr].id} </div>
     <div>${teams[tm].players[plyr].player} </div>
     <div>${teams[tm].players[plyr].score} </div>
     <div>${teams[tm].players[plyr].balls} </div>
    `;
    teamScore.innerHTML = `
    <div>Total Ball:  ${totBall} </div>
    <div>Team Score:  ${tmScore} </div>
    `;

    let playr = ++plyr;

    if (playr == playersCount && tm < teamCount) {
      teams[tm].TotalBalls = totBall;
      teams[tm].TeamScore = tmScore;
      // teams[tm]= players.slice();
      tm = tm + 1;
      plyr = 0;
      tmScore = 0;
      totBall = 0;
    }
  }
}

// -------------------generateWinner---------------------------

function generateWinner() {
  let win;
  teams[0].TeamScore < teams[1].TeamScore ? (win = 2) : (win = 1);

  winner.innerHTML = `<h1> Congratulations! Team ${win} is Winner</h1>`;
}
