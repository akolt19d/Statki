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
    optionsWrapper.style.display = "block";
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