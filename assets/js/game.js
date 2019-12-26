const score = document.querySelector(".score");
const bensin_stat = document.querySelector(".bensin_stat");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");


let player = {
    start: false,
    speed: 5,
    score: 0,
    bensin_stat: 1000
};
let keys = {
    ArrowUp: false
    , ArrowDown: false
    , ArrowRight: false
    , ArrowLeft: false
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

function nabrak(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function dapatKoin(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function gerakTurunMobil(car) {
    let ele = document.querySelectorAll(".batu");
    ele.forEach(function (item) {
        if (nabrak(car, item)) {
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

function gerakTurunKoin(car) {
    let koins = document.querySelectorAll(".koin");
    koins.forEach(function (item) {        
        if (dapatKoin(car, item)) {
            item.classList.add("hide");
            player.score += 100;
            player.bensin_stat += 300;
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
    let car = document.querySelector(".car");
    gerakTurunMobil(car);

    let koin = document.querySelector(".koin");
    gerakTurunKoin(car);
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        if (keys.ArrowUp && player.y > road.top) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.bottom - 250) {
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
        score.innerHTML = "Score: " + player.score ;
        
        player.bensin_stat--;
        bensin_stat.innerHTML = "Fuel: "+ player.bensin_stat ;

        if (player.bensin_stat < 1){
            // console.log("Bensin habis boss");
            endGameNoFuel();
        }
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
    bensin_stat.innerHTML = "Score was " + player.score ;
}

function endGameNoFuel() {
    player.start = false;
    score.innerHTML = "Game Over No More Fuel";
    startScreen.classList.remove("hide");
    bensin_stat.innerHTML = "Score was " + player.score ;
}

function start() {
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    player.bensin_stat = 1000;

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

    //bimon- peletakan mobil pas start supaya di tengah
    let road = gameArea.getBoundingClientRect();
    player.x = Math.floor((road.width-50) / 2) ;

    player.y = car.offsetTop;
    for (let x = 0; x < 3; x++) {
        //bimon- ciptain 3 mobil penghalang setiap render 
        let batu = document.createElement("div");
        batu.classList.add("batu");
        batu.innerHTML = "<br>" + (x + 1);
        batu.y = ((x + 1) * 600) * -1;
        batu.style.top = batu.y + "px";
        batu.style.left = Math.floor(Math.random() * 350) + "px";
        // batu.style.backgroundColor = randomColor();
        
        gameArea.appendChild(batu);
    }

    //bimon- ciptain 1 koin setiap render
    let koin = document.createElement("div");
    koin.classList.add("koin");
    koin.innerHTML = "$";
    // koin.y = ((2 + 1) * 600) * -1;
    koin.y = 100;
    koin.style.top = koin.y + "px";
    koin.style.left = Math.floor(Math.random() * 350) + "px";
    
    gameArea.appendChild(koin);    
    
}

// function randomColor() {
//     function c() {
//         let hex = Math.floor(Math.random() * 256).toString(16);
//         return ("0" + String(hex)).substr(-2)
//     }
//     return "#" + c() + c() + c();
// }