let username = localStorage.getItem("username");
let shipsNum = localStorage.getItem("shipsNum");
let roundTime = localStorage.getItem("roundTime");
let opponent;

const opponents = ["ELMENOL", "SMILEDOG", "case_meen", "_pikus", "Spectral", "Cheppe", "lewek", "AbcightGaming"];

function liczbaLosowa(max) {
    return Math.floor(Math.random()*max);
}

function startAnimation()
{
    const wrapper = document.querySelector("#wrapper");
    const template = document.querySelector("template");

    const cnt = template.content.cloneNode(true);

    wrapper.appendChild(cnt);

    document.querySelector("#popup_player_name").innerText = username;
    document.querySelector("#popup_opp_name").innerText = opponent;
    document.querySelector("#popup").style.animation = "vis 1s linear forwards";
    setTimeout(() => {
            const popupCountdown = document.querySelector("#popup_countdown")

            popupCountdown.append("3...");
            setTimeout(() => {
                popupCountdown.append("2...");
                setTimeout(() => {
                    popupCountdown.append("1...");
                    setTimeout(() => {
                        popupCountdown.append("START!");
                        setTimeout(() => {
                            document.querySelector("#popup").style.opacity = "100%"; 
                            document.querySelector("#popup").style.animation = "wzkaznik 1s linear forwards"
                            setTimeout(() => {
                                document.querySelector("#popup").remove();
                                document.querySelector("#popup_wrapper").remove();
                            }, 1000);
                        }, 1250);
                    }, 1250);
                }, 1250);
            }, 1250);
        }, 1500);
}

window.addEventListener('load', () => {
    opponent = opponents[liczbaLosowa(opponents.length)];

    document.querySelector("#nav_player_name").innerText = username;
    document.querySelector("#nav_opp_name").innerText = opponent;
    document.querySelector("title").innerText = `${username} vs ${opponent}`;

    setTimeout(startAnimation, 1250);
    

})

