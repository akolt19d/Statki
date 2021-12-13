let username, shipsNum, roundTime;

const stats = document.querySelector("#stats");
const about = document.querySelector("#about");
const nameInput = document.querySelector("#name_input");
const nameSubmit = document.querySelector("#name_submit");
const statsReturn = document.querySelector("#stats_return");
const aboutReturn = document.querySelector("#about_return")
const terminal = document.querySelector("#terminal");
const terminalWrapper = document.querySelector("#terminal_wrapper");
const optionsWrapper = document.querySelector("#options_wrapper");
const statsWrapper = document.querySelector("#stats_wrapper");
const ngCheckbox = document.querySelector("#ng_chk");
const aboutWrapper = document.querySelector("#about_wrapper");
const ngWrapper = document.querySelector("#ng_wrapper");
const form = document.querySelector("#ng_wrapper form");
let isFirstTime = true;

function returnToMain()
{
    optionsWrapper.style.display = "block";
    statsWrapper.style.display = "none";
    aboutWrapper.style.display = "none";
}

nameSubmit.addEventListener('click', () => {
    username = nameInput.value;
    document.querySelector("#start").style.display = "none"
    document.querySelector("#stats_username").innerText = username;
    localStorage.setItem("isFirstTime", false)
    optionsWrapper.style.display = "block";
    let days = 60 * 60 * 24 * 90
    document.cookie = `ratio=0-0;max-age=${days}`
})

stats.addEventListener('click', () => {
    optionsWrapper.style.display = "none";
    statsWrapper.style.display = "block";
})

about.addEventListener('click', () => {
    aboutWrapper.style.display = "flex";
    optionsWrapper.style.display = "none";
})

ngCheckbox.addEventListener('change', ()=> {
    if(window.innerWidth > 750)
    {
        if(ngCheckbox.checked)
        {
            terminal.style.width = "50em";
            terminalWrapper.style.width = "100%";
        }
        else
        {
            terminal.style.width = "25em";
            terminalWrapper.style.width = "50%";
        }
    }

    if(ngCheckbox.checked)
        {
            optionsWrapper.style.display = "none";
            setTimeout(() => {
                ngWrapper.style.display = "block";
            }, 1000);
        }
        else
        {
            ngWrapper.style.display = "none";
            setTimeout(() => {
                optionsWrapper.style.display = "block";
            }, 1000);
        }
})

window.addEventListener('load', () => {
    isFirstTime = localStorage.getItem("isFirstTime")
    if(isFirstTime)
    {
        document.querySelector("#start").style.display = "none"
        document.querySelector("#stats_username").innerText = username;
        optionsWrapper.style.display = "block";
    }

    if(document.cookie)
    {
        let cookies = document.cookie.split("=")
        let ratio = cookies[1]

        let wins = parseInt(ratio.split("-")[0])
        let losses = parseInt(ratio.split("-")[1])
        let gamesPlayed = wins + losses
        let winPercentage;
        if(losses == 0)
        {
            winPercentage = wins * 100;
        }
        else
        {
            winPercentage = Math.floor((wins / losses) * 100)
        }

        //console.log(`${gamesPlayed}, ${ratio}, ${winPercentage}`)

        document.querySelector("#games_played").innerText = `rozegrane gry: ${gamesPlayed}`
        document.querySelector("#ratio").innerText = `bilans: ${ratio}`
        document.querySelector("#win_percentage").innerText = `procent wygranych: ${winPercentage}%`
    }
    //console.log(isFirstTime)
})

form.addEventListener('submit', () => {
    shipsNum = document.querySelector("#ng_wrapper input:checked").value;
    roundTime = document.querySelector("#round_time").value;

    localStorage.setItem("username", username);
    localStorage.setItem("shipsNum", shipsNum);
    localStorage.setItem("roundTime", roundTime);
    // alert(
    //     `${username}, ${shipsNum}, ${roundTime}`
    // )
})

statsReturn.addEventListener('click', returnToMain);
aboutReturn.addEventListener('click', returnToMain);