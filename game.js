let username = localStorage.getItem("username");
let shipsNum = localStorage.getItem("shipsNum");
let roundTime = localStorage.getItem("roundTime");

const opponents = ["ELMENOL", "SMILEDOG", "case_meen", "_pikus", "Spectral", "Cheppe", "lewek", "AbcightGaming"];

function liczbaLosowa(max) {
    return Math.floor(Math.random()*max);
}

window.addEventListener('load', () => {
    let opponent = opponents[liczbaLosowa(opponents.length)];

    document.querySelector("#nav_player_name").innerText = username;
    document.querySelector("#nav_opp_name").innerText = opponent;
})
