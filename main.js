let username;
export { username };

const stats = document.querySelector("#stats");
const nameInput = document.querySelector("#name_input");
const nameSubmit = document.querySelector("#name_submit");
const statsReturn = document.querySelector("#stats_return");

function returnToMain()
{
    document.querySelector("#options_wrapper").style.display = "block";
    document.querySelector("#stats_wrapper").style.display = "none";
}

nameSubmit.addEventListener('click', () => {
    username = nameInput.value;
    document.querySelector("#start").style.display = "none"
    document.querySelector("#stats_username").innerText = username;
    document.querySelector("#options_wrapper").style.display = "block";
})

stats.addEventListener('click', () => {
    document.querySelector("#options_wrapper").style.display = "none";
    document.querySelector("#stats_wrapper").style.display = "block";
})

statsReturn.addEventListener('click', returnToMain);