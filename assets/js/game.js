const score = document.querySelector(".score");
const energy_stat = document.querySelector(".energy_stat");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");


let player = {
    start: false,
    speed: 5,
    score: 0,
    energy_stat: 1000
};
let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
// startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function moveLines() {
    let lines = document.querySelectorAll(".line");

    lines.forEach(function (item) {
        if (item.y >= 1500) {
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function getHit(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function getWorm(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function movingDownBird(bird) {
    let ele = document.querySelectorAll(".swarm");
    ele.forEach(function (item) {
        if (getHit(bird, item)) {
            // console.log("HIT");
            endGame();
        }
        if (item.y >= 1500) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            // item.style.backgroundColor = randomColor();
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function movingDownWorm(bird) {
    let worms = document.querySelectorAll(".worm");
    worms.forEach(function (item) {        
        if (getWorm(bird, item)) {
            item.classList.add("hide");
            player.score += 100;
            player.energy_stat += 300;
        }       
        if (item.y >= 1500) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            item.classList.remove("hide");
        }       
        item.y += player.speed;
        item.style.top = item.y + "px";
    })    
}

function playGame() {
    moveLines();
    let bird = document.querySelector(".bird");
    movingDownBird(bird);

    let worm = document.querySelector(".worm");
    movingDownWorm(bird);
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top - 250) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.bottom - 200) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 100)) {
            player.x += player.speed;
        }
        bird.style.left = player.x + 'px';
        bird.style.top = player.y + 'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "Score: " + player.score;
        if (player.score > 100) {
            player.speed = 6
        }
        if (player.score > 200) {
            player.speed = 7
        }
        if (player.score > 300) {
            player.speed = 8
        }
        if (player.score > 400) {
            player.speed = 9
        }
        if (player.score > 500) {
            player.speed = 10
        }
        score.innerHTML = "Score: " + player.score ;
        
        player.energy_stat--;
        energy_stat.innerHTML = "Energy: "+ player.energy_stat ;

        if (player.energy_stat < 1){
            // console.log("Energy habis boss");
            endGameNoEnergy();
        }
    }
}


function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function pressOff(e) {
    if  (player.start == false){ start()}

    e.preventDefault();
    keys[e.key] = false;
}

function endGame() {
    player.start = false;
    score.innerHTML = "Game Over";
    startScreen.classList.remove("hide");
    energy_stat.innerHTML = "Score was " + player.score ;
}

function endGameNoEnergy() {
    player.start = false;
    score.innerHTML = "Game Over No More Energy";
    startScreen.classList.remove("hide");
    energy_stat.innerHTML = "Score was " + player.score ;
}

function start() {
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    player.energy_stat = 1000;

    for (let x = 0; x < 10; x++) {
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 150;
        div.style.top = (x * 150) + "px";
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    let bird = document.createElement("div");
    //bird.innerText = "bird";
    bird.setAttribute("class", "bird");
    gameArea.appendChild(bird);

    //bimon- peletakan bird pas start supaya di tengah
    let road = gameArea.getBoundingClientRect();
    player.x = Math.floor((road.width-50) / 2) ;

    player.y = bird.offsetTop;
    for (let x = 0; x < 3; x++) {
        //bimon- ciptain 3 bird penghalang setiap render 
        let swarm = document.createElement("div");
        swarm.classList.add("swarm");
        swarm.innerHTML = "<br>" + (x + 1);
        swarm.y = ((x + 1) * 600) * -1;
        swarm.style.top = swarm.y + "px";
        swarm.style.left = Math.floor(Math.random() * 350) + "px";
        // swarm.style.backgroundColor = randomColor();
        
        gameArea.appendChild(swarm);
    }

    //bimon- ciptain 1 worm setiap render
    let worm = document.createElement("div");
    worm.classList.add("worm");
    worm.innerHTML = "";
    // worm.y = ((2 + 1) * 600) * -1;
    worm.y = 100;
    worm.style.top = worm.y + "px";
    worm.style.left = Math.floor(Math.random() * 350) + "px";
    
    gameArea.appendChild(worm);    
    
}

// function randomColor() {
//     function c() {
//         let hex = Math.floor(Math.random() * 256).toString(16);
//         return ("0" + String(hex)).substr(-2)
//     }
//     return "#" + c() + c() + c();
// }