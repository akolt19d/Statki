let username = localStorage.getItem("username");
let shipsNum = localStorage.getItem("shipsNum");
let roundTime = localStorage.getItem("roundTime");
let opponent;
let startGame = false;
let playerShipsSunk = 0;
let oppShipsSunk = 0;
let roundNum = 0;
let gameOver = false;
let fleetPosition = [];
let enemyFleet = generateEnemyFleet();
let flag = 0;
let flagSequel = 0;

const opponents = ["ELMENOL", "SMILEDOG", "case_meen", "_pikus", "Spectral", "Cheppe", "lewek", "AbcightGaming"];
const field = document.querySelector("#field")
const terminal = document.querySelector("#terminal")
const wrapper = document.querySelector("#wrapper");

function randomInt(max) {
    return Math.floor(Math.random()*max);
}

function terminalLog(text)
{
    const p = document.createElement("p")
    p.innerText = text;
    terminal.append(p)
}

function startAnimation()
{
    const template = document.querySelectorAll("template")[0];

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

    //console.log(shipSum)

    if(shipSum == 0)
    {
        isFull = true;
    }

    return isFull;
}

function generateEnemyFleet()
{
    let enemyFleet = []
    let fieldNum = []
    
    for(let i = 1; i <= 64; i++)
    {
        fieldNum[i-1] = i
    }
    
    for(let i = 16; i < 20; i+=4)
    {
        let random = fieldNum[randomInt(fieldNum.length)]
    
        enemyFleet[i] = random - 1
        enemyFleet[i+1] = random
        enemyFleet[i+2] = random + 1
        enemyFleet[i+3] = random + 2

        fieldNum.splice(random-2, 1)
        fieldNum.splice(random-1, 1)
        fieldNum.splice(random, 1)
        fieldNum.splice(random+1, 1)
    }

    for(let i = 10; i < 16; i+=3)
    {
        let random = fieldNum[randomInt(fieldNum.length)]

        enemyFleet[i] = random - 1
        enemyFleet[i+1] = random
        enemyFleet[i+2] = random + 1

        fieldNum.splice(random-2, 1)
        fieldNum.splice(random-1, 1)
        fieldNum.splice(random, 1)
    }

    for(let i = 4; i < 10; i+=2)
    {
        let random = fieldNum[randomInt(fieldNum.length)]

        enemyFleet[i] = random
        enemyFleet[i+1] = random + 1

        fieldNum.splice(random-1, 1)
        fieldNum.splice(random, 1)
    }

    for(let i = 0; i < 4; i++)
    {
        let random = fieldNum[randomInt(fieldNum.length)]
        //console.log(random)

        enemyFleet[i] = random
        fieldNum.splice(random-1, 1)
    }
    //console.log(fieldNum)
    //console.log(enemyFleet)

    return enemyFleet;
}

function isGameOver()
{
    if(oppShipsSunk >= enemyFleet.length || playerShipsSunk >= fleetPosition.length)
        return true;
    else
        return false;
}

function oppTurn()
{
    if(flagSequel == 0)
    {
        document.querySelector("#field").style.display = "grid"
        document.querySelector("#opp_field").style.display = "none"
        document.querySelector("#field_name").innerText = "Twoja plansza"

        let grids = []
        let isPlayerField = false;
        for(let i = 1; i <= 64; i++)
        {
            grids[i-1]=  i;
        }
        //console.log(`przed usunięciem: ${grids}`)
    
        let oppGuess = grids[randomInt(grids.length)];
        //console.log(oppGuess)
    
        for(let i = 0; i < 64; i++)
        {
            if(oppGuess == grids[i])
                grids.splice(i, 1)
        }
    
        for(let i = 0; i < fleetPosition.length; i++)
        {
            if(oppGuess == fleetPosition[i])
            {
                isPlayerField = true;
            }
        }
    
        if(isPlayerField)
        {
            if(oppGuess < 10)
            {
                document.querySelector(`#field_grid0${oppGuess}`).style.backgroundColor = "red"
                document.querySelector(`#field_grid0${oppGuess}`).style.border = "0.2em solid black"
            }
            else
            {
                document.querySelector(`#field_grid${oppGuess}`).style.backgroundColor = "red"
                document.querySelector(`#field_grid${oppGuess}`).style.border = "0.2em solid black"
            }
            terminalLog(`${opponent} zatopił statek!`)
            playerShipsSunk++;
        }
        else
        {
            if(oppGuess < 10)
            {
                document.querySelector(`#field_grid0${oppGuess}`).style.backgroundColor = "#0e0e0e"
                document.querySelector(`#field_grid0${oppGuess}`).style.border = "0.2em solid black"
            }
            else
            {
                document.querySelector(`#field_grid${oppGuess}`).style.backgroundColor = "#0e0e0e"
                document.querySelector(`#field_grid${oppGuess}`).style.border = "0.2em solid black"
            }
            terminalLog(`${opponent} nie trafił.`)
        }
        //console.log(`po usunięciu: ${grids}`)
        //console.log(`Wynik: ${oppShipsSunk} - ${playerShipsSunk}`)
    
        gameOver = isGameOver()
        flag = 0;
        setTimeout(playerTurn, 2000);
        flagSequel++
        //console.log(flag)
    }
}

function selectOppField(e){
    let clickedField = parseInt(e.currentTarget.id[e.currentTarget.id.length - 2]+e.currentTarget.id[e.currentTarget.id.length - 1])
    let isOppField = false;

    for(let j = 0; j < enemyFleet.length; j++)
    {
        if(clickedField == enemyFleet[j])
            isOppField = true;
    }

    if(isOppField)
    {
        e.currentTarget.style.backgroundColor = "var(--color-green)"
        e.currentTarget.style.border = "0.2em solid black"
        terminalLog(`${username} zatopił statek!`)
        oppShipsSunk++;
    }
    else
    {
        e.currentTarget.style.backgroundColor = "red"
        e.currentTarget.style.border = "0.2em solid black"
        terminalLog(`${username} nie trafił.`)
    }

    for(let j = 0; j < 64; j++)
    {
        document.querySelectorAll(".opp_field_grid")[j].removeEventListener('click', selectOppField)
    }

    gameOver = isGameOver();
    flagSequel = 0;
    setTimeout(oppTurn, 2000);
    flag++
    //console.log(flagSequel)
}

function playerTurn()
{
    if(flag == 0)
    {
        document.querySelector("#field").style.display = "none"
        document.querySelector("#opp_field").style.display = "grid"
        document.querySelector("#field_name").innerText = "Plansza przeciwnika"
        roundNum++;
        document.querySelector("#timer h3").innerText = `runda ${roundNum}`
        for(let i = 0; i < 64; i++)
            document.querySelectorAll(".opp_field_grid")[i].addEventListener('click', selectOppField)
    }
}

function gameOverAnimation()
{
    const template = document.querySelectorAll("template")[1];

    const cnt = template.content.cloneNode(true);

    wrapper.appendChild(cnt);

    if(playerShipsSunk > oppShipsSunk)
    {
        document.querySelector("#end_popup section:first-child h1").innerText = "Przegrałeś :("
    }
    document.querySelector("#end_popup_player_name").innerText = username
    document.querySelector("#end_popup_opp_name").innerText = opponent
    document.querySelector("#end_popup section:last-of-type h2:nth-child(2)").innerText = `${oppShipsSunk}-${playerShipsSunk}`
    document.querySelector("#end_popup section:last-of-type h2:last-child").innerText = `${roundNum}`
    document.querySelector("#end_popup").style.animation = "vis 1s linear forwards";
    document.querySelector("#exit_game").addEventListener('click', () => {
        window.location.replace("./index.html");
    })
}

function gameLoop()
{
    console.log(enemyFleet)
    
    playerTurn()

    let gameOverWatcher = setInterval(() => {
        if(gameOver)
        {
            setTimeout(gameOverAnimation, 1250);
            clearInterval(gameOverWatcher)
        }
    }, 1000);
}


function positioningShips()
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

    for(let i = 0; i < 64; i++)
    {
        const div = document.createElement("div")
        div.className = "opp_field_grid";
        if(i < 9)
        {
            div.id = `opp_field_grid0${i+1}`;
        }
        else
        {
            div.id = `opp_field_grid${i+1}`;
        }
        document.querySelector("#opp_field").append(div);
    }
    
    let rotation = 8;
    document.querySelector("#rt_right").addEventListener('click', () => { rotation = 1 })
    document.querySelector("#rt_bottom").addEventListener('click', () => { rotation = 8 })

    for(let i = 0; i < 4; i++)
    {
        document.querySelectorAll("#position_container div p")[i].addEventListener('click', (e)=>{
            let shipAmount = parseInt(e.currentTarget.innerText[0])
            let shipSize = parseInt(e.currentTarget.innerText[e.currentTarget.innerText.length-1])
            
            if(shipAmount == 0)
            {
                console.log(fleetPosition[0])
                console.log(fleetPosition)
            }
            else
            {
                //console.log(shipSize)
                
                for(let i = 0; i < 64; i++)
                {
                    let startingPosition = 0;
                    document.querySelectorAll(".field_grid")[i].addEventListener('click', function positioningShips(e){
                        startingPosition = parseInt(e.currentTarget.id[e.currentTarget.id.length - 2] + e.currentTarget.id[e.currentTarget.id.length - 1]);
                        
                        for(let i = startingPosition; i < startingPosition + shipSize * rotation; i += rotation)
                        {
                            //console.log(i);
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
                            fleetPosition[fleetPosition.length] = i;
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
                            startGame = true;
                        }
                    })
                }
                shipAmount = parseInt(e.currentTarget.innerText[0])
                e.currentTarget.innerText = `${shipAmount-1}x${shipSize}`;
            }
        });
    }
}

window.addEventListener('load', () => {
    opponent = opponents[randomInt(opponents.length)];

    document.querySelector("#nav_player_name").innerText = username;
    document.querySelector("#nav_opp_name").innerText = opponent;
    document.querySelector("title").innerText = `${username} vs ${opponent}`;

    setTimeout(startAnimation, 1250);
    
    positioningShips()

    let checkGameStart = setInterval(() => {
        if(startGame == true)
        {
            gameLoop();
            terminalLog("Floty zostały rozstawione")
            clearInterval(checkGameStart);
            //console.log(fleetPosition)
        }
    }, 10);
})

