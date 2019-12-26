// const score = document.querySelector(".score");
// const startScreen = document.querySelector(".startScreen");
// const gameArea = document.querySelector(".gameArea");
const score = document.getElementsByClassName("score")[0];
const startScreen = document.getElementsByClassName("startScreen")[0];
const gameArea = document.getElementsByClassName("gameArea")[0];
let player = {
    speed: 5
    , score: 0
};
let keys = {
    ArrowUp: false
    , ArrowDown: false
    , ArrowRight: false
    , ArrowLeft: false
};
startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function moveLines() {
    let lines = document.querySelectorAll(".line");
    // let lines = document.getElementsByClassName("line");

    lines.forEach(function (item) {
        if (item.y >= 1500) {
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveEnemy(car) {
    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function (item) {
        if (isCollide(car, item)) {
            console.log("HIT");
            endGame();
        }
        if (item.y >= 1500) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            item.style.backgroundColor = randomColor();
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function gerakTurunKoin(koin) {
    let ele = document.querySelectorAll(".koin");
    ele.forEach(function (item) {
        // if (isCollide(car, item)) {
        //     console.log("HIT");
        //     endGame();
        // }
        if (item.y >= 1500) {
            item.y = -600;
            item.style.left = Math.floor(Math.random() * 350) + "px";
            item.style.backgroundColor = randomColor();
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function playGame() {
    moveLines();
    let car = document.querySelector(".car");
    moveEnemy(car);

    let koin = document.querySelector(".koin");
    gerakTurunKoin(koin);
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.bottom - 200) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed;
        }
        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "Score: " + player.score ;
        
    }
}

function pressOn(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function pressOff(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function endGame() {
    player.start = false;
    score.innerHTML = "Game Over<br>Score was " + player.score;
    startScreen.classList.remove("hide");
}

function start() {
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    for (let x = 0; x < 10; x++) {
        let div = document.createElement("div");
        div.classList.add("line");
        div.y = x * 150;
        div.style.top = (x * 150) + "px";
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    let car = document.createElement("div");
    //car.innerText = "Car";
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for (let x = 0; x < 3; x++) {
        //ciptain 3 musuh setiap render 
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.innerHTML = "<br>" + (x + 1);
        enemy.y = ((x + 1) * 600) * -1;
        enemy.style.top = enemy.y + "px";
        enemy.style.left = Math.floor(Math.random() * 350) + "px";
        enemy.style.backgroundColor = randomColor();
        gameArea.appendChild(enemy);
    }

    //ciptain 1 koin setiap render
    let koin = document.createElement("div");
    koin.classList.add("koin");
    koin.innerHTML = "<br> $";
    koin.y = ((2 + 1) * 600) * -1;
    koin.style.top = koin.y + "px";
    koin.style.left = Math.floor(Math.random() * 350) + "px";
    enemy.style.backgroundColor = randomColor();
    gameArea.appendChild(koin)
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2)
    }
    return "#" + c() + c() + c();
}