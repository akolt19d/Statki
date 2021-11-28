let username = localStorage.getItem("username");
let shipsNum = localStorage.getItem("shipsNum");
let roundTime = localStorage.getItem("roundTime");
let opponent;

const opponents = ["ELMENOL", "SMILEDOG", "case_meen", "_pikus", "Spectral", "Cheppe", "lewek", "AbcightGaming"];
const field = document.querySelector("#field")

function randomInt(max) {
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

function isFleetFull()
{
    let shipSum = 0;
    let isFull = false;

    for(let i = 0; i < 4; i++)
    {
        shipSum += parseInt(document.querySelectorAll("#position_container div p")[i].innerText[0])
    }

    console.log(shipSum)

    if(shipSum == 0)
    {
        isFull = true;
    }

    return isFull;
}

function positioningShips(shipsNum)
{
    for(let i = 0; i < 64; i++)
    {
        const div = document.createElement("div")
        div.className = "field_grid";
        if(i < 9)
        {
            div.id = `field_grid0${i+1}`;
        }
        else
        {
            div.id = `field_grid${i+1}`;
        }
        field.append(div);
    }
    
    let rotation = 8;
    document.querySelector("#rt_right").addEventListener('click', () => { rotation = 1 })
    document.querySelector("#rt_bottom").addEventListener('click', () => { rotation = 8 })

    let fleetPosition = [];

    for(let i = 0; i < 4; i++)
    {
        document.querySelectorAll("#position_container div p")[i].addEventListener('click', (e)=>{
            let shipAmount = parseInt(e.currentTarget.innerText[0])
            let shipSize = parseInt(e.currentTarget.innerText[e.currentTarget.innerText.length-1])
            
            if(shipAmount == 0)
            {
                //console.log("essa")
                console.log(fleetPosition[0] + fleetPosition[1])
            }
            else
            {
                console.log(shipSize)

                for(let i = 0; i < 64; i++)
                {
                    let startingPosition = 0;
                    document.querySelectorAll(".field_grid")[i].addEventListener('click', function positioningShips(e){
                    startingPosition = parseInt(e.currentTarget.id[e.currentTarget.id.length - 2] + e.currentTarget.id[e.currentTarget.id.length - 1]);
    
                    for(let i = startingPosition; i < startingPosition + shipSize * rotation; i += rotation)
                    {
                        console.log(i);
                        if(i <= 9)
                        {
                            document.querySelector(`#field_grid0${i}`).style.backgroundColor = "var(--color-green)";
                            document.querySelector(`#field_grid0${i}`).style.border = "0.2em solid black";
                        }
                        else 
                        {
                            document.querySelector(`#field_grid${i}`).style.backgroundColor = "var(--color-green)";
                            document.querySelector(`#field_grid${i}`).style.border = "0.2em solid black";
                        }
                        fleetPosition += i;
                    }
    
                    for(let i = 0; i < 64; i++)
                    {
                        document.querySelectorAll(".field_grid")[i].removeEventListener('click', positioningShips)
                    }
                    
                    startingPosition = 0;
                    shipAmount = 0;
                    shipSize = 0;
                    let isFull = isFleetFull()
                    if(isFull == true)
                    {
                        document.querySelector("#inner_container > div:last-child").style.display = "none";
                        document.querySelector("#position_container").style.opacity = 0;
                        setTimeout(() => {
                            document.querySelector("#position_container").style.display = "none";
                        }, 2000);
                    }
                    })
                }
                shipAmount = parseInt(e.currentTarget.innerText[0])
                e.currentTarget.innerText = `${shipAmount-1}x${shipSize}`;
            }
        });
    }

    // document.querySelector("#position_container").addEventListener('click', ()=>{
    //     document.querySelector("#position_container").style.height = "5em"
    // })
}

window.addEventListener('load', () => {
    opponent = opponents[randomInt(opponents.length)];

    document.querySelector("#nav_player_name").innerText = username;
    document.querySelector("#nav_opp_name").innerText = opponent;
    document.querySelector("title").innerText = `${username} vs ${opponent}`;

    //setTimeout(startAnimation, 1250);
    
    positioningShips(shipsNum)
})

