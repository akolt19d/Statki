const stats = document.querySelector("#stats");

stats.addEventListener('click', () => {
    document.querySelector("#options_wrapper").style.display = "none";
    document.querySelector("#stats_wrapper").style.display = "block";
})