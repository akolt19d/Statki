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
let time = roundTime;
let countdownInterval;

let cookies = document.cookie.split("=")
let ratio = cookies[1]

let wins = parseInt(ratio.split("-")[0])
let losses = parseInt(ratio.split("-")[1])

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
    terminal.scrollTo(0, terminal.scrollHeight);
    terminal.append(p)
}

document.querySelector("#mobile_window1").addEventListener('change', () => {
    if(document.querySelector("#mobile_window1").checked)
    {
        document.querySelector("#label1").style.color = "var(--color-green)"
        document.querySelector("#label2").style.color = "var(--color-grey)"
    }
})
document.querySelector("#mobile_window2").addEventListener('change', () => {
    if(document.querySelector("#mobile_window2").checked)
    {
        document.querySelector("#label1").style.color = "var(--color-grey)"
        document.querySelector("#label2").style.color = "var(--color-green)"
    }
})

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

    if(shipsNum == "8")
    {
        for(let i = 0; i < 3; i++)
        {
            shipSum += parseInt(document.querySelectorAll("#position_container div p")[i].innerText[0])
        } 
    }
    else
    {
        for(let i = 0; i < 4; i++)
        {
            shipSum += parseInt(document.querySelectorAll("#position_container div p")[i].innerText[0])
        }
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

    function generateLength4(i)
    {
        let random = randomInt(fieldNum.length - 4)
        let isValid = true;
        console.log(fieldNum[random])

        if(fieldNum[random+3] - fieldNum[random] != 3)
            isValid = false;

        if(isValid == true)
        {
            enemyFleet[i] = fieldNum[random]
            enemyFleet[i+1] = fieldNum[random+1]
            enemyFleet[i+2] = fieldNum[random+2]
            enemyFleet[i+3] = fieldNum[random+3]

            for(let j = 0; j < fieldNum.length; j++)
            {
                if(j == fieldNum[random])
                {
                    fieldNum.splice(j, 4)
                }
            }
        }
        else
        {
            generateLength4(i);
        }

        console.log(isValid)
    }
    
    for(let i = 0; i < 8; i+=4)
    {
        generateLength4(i);
    }
    //console.log(enemyFleet)
    //console.log(fieldNum)
    
    function generateLength3(i)
    {
        let random = randomInt(fieldNum.length)
        //console.log(random)

        let randomAvg = (fieldNum[random] + fieldNum[random+1] + fieldNum[random+2]) / 3

        if(randomAvg == fieldNum[random+1])
        {
            enemyFleet[i] = fieldNum[random]
            enemyFleet[i+1] = fieldNum[random+1]
            enemyFleet[i+2] = fieldNum[random+2]

            for(let j = 0; j < fieldNum.length; j++)
            {
                if(j == random)
                {
                    fieldNum.splice(j, 3)
                }
            }
        }
        else
        {
            generateLength3(i);
        }
    }

    for(let i = 8; i < 14; i+=3)
    {
        generateLength3(i)
    }
    // //console.log(enemyFleet)
    // //console.log(fieldNum)

    function generateLength2(i)
    {
        let random = randomInt(fieldNum.length)
        //console.log(random)

        if((random+1)-random == fieldNum[random+1]-fieldNum[random])
        {
            enemyFleet[i] = fieldNum[random]
            enemyFleet[i+1] = fieldNum[random+1]

            for(let j = 0; j < fieldNum.length; j++)
            {
                if(j == random)
                {
                    fieldNum.splice(j, 2)
                }
            }
        }
        else
        {
            generateLength2(i);
        }
    }

    for(let i = 14; i < 20; i+=2)
    {
        generateLength2(i)
    }
    // //console.log(enemyFleet)
    // //console.log(fieldNum)

    for(let i = 20; i < 25; i++)
    {
        let random = randomInt(fieldNum.length)
        //console.log(fieldNum[random])

        enemyFleet[i] = fieldNum[random]

        for(let j = 0; j < fieldNum.length; j++)
        {
            if(j == random)
             {
                fieldNum.splice(j, 1)
            }
        }
    }

    if(shipsNum != "12")
    {
        enemyFleet.splice(0, 4)
        enemyFleet.splice(enemyFleet.length - 1, 1)
        if(shipsNum == "8")
        {
            enemyFleet.splice(0, 7)
        }
    }
    //console.log(fieldNum)
    console.log(enemyFleet)

    return enemyFleet;
}

function isGameOver()
{
    if(oppShipsSunk >= enemyFleet.length || playerShipsSunk >= fleetPosition.length)
        return true;
    else
        return false;
}

let grids = []
for(let i = 1; i <= 64; i++)
{
    grids[i-1]=  i;
}

function oppTurn()
{
    if(flagSequel == 0)
    {
        let oppTurnDuration = (randomInt(roundTime - 1) + 1) * 1000;
        document.querySelector("#field").style.display = "grid"
        document.querySelector("#opp_field").style.display = "none"
        document.querySelector("#field_name").innerText = "Twoja plansza"
        time = roundTime;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        document.querySelector("#timer h1").innerText = `${minutes}:${seconds}`;
        time--;
        countdownInterval = setInterval(countdown, 1000);

        function countdown()
        {
            minutes = Math.floor(time / 60);
            seconds = time % 60;

            if(seconds < 10)
            {
                seconds = "0" + seconds;
            }

            document.querySelector("#timer h1").innerText = `${minutes}:${seconds}`;
            time--;
        }

        setTimeout(() => {
            let isPlayerField = false;
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
            //console.log(`po usunięciu: ${grids}`)
        
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
                terminalLog(`${opponent} trafił!`)
                playerShipsSunk++;
                terminalLog(`Wynik: ${oppShipsSunk} - ${playerShipsSunk}`)
            }
            else
            {
                if(oppGuess < 10)
                {
                    document.querySelector(`#field_grid0${oppGuess}`).style.backgroundColor = "#0a0a0a"
                    document.querySelector(`#field_grid0${oppGuess}`).style.border = "0.2em solid black"
                }
                else
                {
                    document.querySelector(`#field_grid${oppGuess}`).style.backgroundColor = "#0a0a0a"
                    document.querySelector(`#field_grid${oppGuess}`).style.border = "0.2em solid black"
                }
                terminalLog(`${opponent} nie trafił.`)
            }

            clearInterval(countdownInterval);
            gameOver = isGameOver()
            flag = 0;
            setTimeout(playerTurn, 2000);
            flagSequel++
        }, oppTurnDuration);
    }
}

function selectOppField(e){
    let clickedField = parseInt(e.currentTarget.id[e.currentTarget.id.length - 2]+e.currentTarget.id[e.currentTarget.id.length - 1])
    let isOppField = false;
    let isAlreadyGuessed = false;
    for(let j = 0; j < playerGuesses.length; j++)
    {
        if(playerGuesses[j] == clickedField)
            isAlreadyGuessed = true;
    }

    if(!isAlreadyGuessed)
    {
        clearInterval(countdownInterval);
    
        for(let j = 0; j < enemyFleet.length; j++)
        {
            if(clickedField == enemyFleet[j])
                isOppField = true;
        }
    
        if(isOppField)
        {
            e.currentTarget.style.backgroundColor = "var(--color-green)"
            e.currentTarget.style.border = "0.2em solid black"
            terminalLog(`${username} trafił!`)
            oppShipsSunk++;
            terminalLog(`Wynik: ${oppShipsSunk} - ${playerShipsSunk}`)
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
    
        playerGuesses[playerGuesses.length] = clickedField
        gameOver = isGameOver();
        flagSequel = 0;
        setTimeout(oppTurn, 2000);
        flag++
    }
}

let playerGuesses = []

function playerTurn()
{
    if(flag == 0)
    {
        document.querySelector("#field").style.display = "none"
        document.querySelector("#opp_field").style.display = "grid"
        document.querySelector("#field_name").innerText = "Plansza przeciwnika"
        roundNum++;
        document.querySelector("#timer h3").innerText = `runda ${roundNum}`
        time = roundTime;
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        document.querySelector("#timer h1").innerText = `${minutes}:${seconds}`;
        time--;
        countdownInterval = setInterval(countdown, 1000);

        function countdown()
        {
            minutes = Math.floor(time / 60);
            seconds = time % 60;

            if(seconds < 10)
            {
                seconds = "0" + seconds;
            }

            document.querySelector("#timer h1").innerText = `${minutes}:${seconds}`;
            time--;

            if(seconds == "00" && minutes == 0)
            {
                for(let j = 0; j < 64; j++)
                {
                    document.querySelectorAll(".opp_field_grid")[j].removeEventListener('click', selectOppField)
                }
                terminalLog(`${username} nie oddał strzału.`)
                flagSequel = 0;
                setTimeout(oppTurn, 1000)
                flag++
                clearInterval(countdownInterval)
            }
        }

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
        losses++;
    }
    else
    {
        wins++;
    }
    document.querySelector("#end_popup_player_name").innerText = username
    document.querySelector("#end_popup_opp_name").innerText = opponent
    document.querySelector("#end_popup section:last-of-type h2:nth-child(2)").innerText = `${oppShipsSunk}-${playerShipsSunk}`
    document.querySelector("#end_popup section:last-of-type h2:last-child").innerText = `${roundNum}`
    document.querySelector("#end_popup").style.animation = "vis 1s linear forwards";
    let days = 60 * 60 * 24 * 90
    document.cookie = `${cookies[0]}=${wins}-${losses};max-age=${days}`
    document.querySelector("#exit_game").addEventListener('click', () => {
        window.location.replace("./index.html");
    })
}

function gameLoop()
{
    //console.log(enemyFleet)
    
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
    
    document.querySelector("#rt_right").addEventListener('click', () => { rotation = 1 })
    document.querySelector("#rt_bottom").addEventListener('click', () => { rotation = 8 })
    
    for(let i = 0; i < 4; i++)
    {
        document.querySelectorAll("#position_container div p")[i].addEventListener('click', (e)=>{
            shipAmount = parseInt(e.currentTarget.innerText[0])
            shipSize = parseInt(e.currentTarget.innerText[e.currentTarget.innerText.length-1])
            
            
            if(shipAmount == 0)
            {
                console.log(fleetPosition[0])
                console.log(fleetPosition)
            }
            else
            {
                //console.log(shipSize)
                if(window.innerWidth > 750)
                {
                    document.querySelector("#position_container").style.height = "7.5em"
                }
                document.querySelector("#rotation_container").style.display = "flex"
                
                for(let i = 0; i < 64; i++)
                {
                    document.querySelectorAll(".field_grid")[i].addEventListener('click', pickShip)
                    document.querySelectorAll(".field_grid")[i].addEventListener('mouseover', showShipPosition)
                }

                for(let i = 0; i < fleetPosition.length; i++)
                {
                    if(fleetPosition[i] < 10)
                    {
                        document.querySelectorAll(`.field_grid`)[fleetPosition[i] - 1].removeEventListener('click', pickShip)
                        //console.log(fleetPosition[i] - 1)
                    }
                    else
                    {
                        document.querySelectorAll(`.field_grid`)[fleetPosition[i] - 1].removeEventListener('click', pickShip)
                        //console.log(fleetPosition[i] - 1)
                    }
                }
                shipAmount = parseInt(e.currentTarget.innerText[0])
                e.currentTarget.innerText = `${shipAmount-1}x${shipSize}`;
            }
        });
    }
}

let startingPosition = 0;
let rotation = 8;
let shipAmount, shipSize;

function pickShip(e){
    startingPosition = parseInt(e.currentTarget.id[e.currentTarget.id.length - 2] + e.currentTarget.id[e.currentTarget.id.length - 1]);
    let temp1 = shipAmount;
    let temp2 = shipSize;
    
    if(rotation == 8 && startingPosition <= 64 - (8 * (shipSize-1)) || (rotation == 1 && startingPosition <= 64 - (shipSize-1)))
    {
        //console.log(startingPosition)
        //console.log(64 - (8 * (shipSize-1)))
        if(window.innerWidth > 750)
        {
            document.querySelector("#position_container").style.height = "15em"
        }
        document.querySelector("#rotation_container").style.display = "none"
        
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
            document.querySelectorAll(".field_grid")[i].removeEventListener('click', pickShip)
            document.querySelectorAll(".field_grid")[i].removeEventListener('mouseover', showShipPosition)
            document.querySelectorAll(".field_grid")[i].style.filter = "none"
        }
        
        startingPosition = 0;
        shipAmount = 0;
        shipSize = 0;
    }
    else
    {
        shipAmount = temp1;
        shipSize = temp2;
    }
    let isFull = isFleetFull()
    if(isFull == true)
    {
        document.querySelector("#inner_container > div:last-child").style.display = "none";
        document.querySelector("#position_container").style.opacity = 0;
        // for(let i = 0; i < 64; i++)
        // {
        //     document.querySelectorAll(".field_grid")[i].style.border = "0"
        //     document.querySelectorAll(".opp_field_grid")[i].style.border = "0"
        //     document.querySelectorAll(".field_grid:hover")[i].style.border = "0.2em solid var(--color-green)"
        //     document.querySelectorAll(".opp_field_grid:hover")[i].style.border = "0.2em solid var(--color-green)"
        // }
        setTimeout(() => {
            document.querySelector("#position_container").style.display = "none";
            startGame = true;
        }, 2000);
    }
}

function showShipPosition(e)
{
    let hoverPosition = parseInt(e.currentTarget.id[e.currentTarget.id.length - 2] + e.currentTarget.id[e.currentTarget.id.length - 1]);

    if(rotation == 8 && hoverPosition <= 64 - (8 * (shipSize-1)) || (rotation == 1 && hoverPosition <= 64 - (shipSize-1)))
    {
        for(let i = hoverPosition; i < hoverPosition + shipSize * rotation; i += rotation)
            {
                //console.log(i);
                if(i <= 9)
                {
                    document.querySelector(`#field_grid0${i}`).style.filter = "brightness(20%)";
                }
                else 
                {
                    document.querySelector(`#field_grid${i}`).style.filter = "brightness(20%)";
                }
            }
        e.currentTarget.addEventListener('mouseout', () => {
            for(let i = hoverPosition; i < hoverPosition + shipSize * rotation; i += rotation)
            {
                if(i <= 9)
                {
                    document.querySelector(`#field_grid0${i}`).style.filter = "brightness(100%)"
                }
                else 
                {
                    document.querySelector(`#field_grid${i}`).style.filter = "brightness(100%)"
                }
            }
        })
    }
}

window.addEventListener('load', () => {
    opponent = opponents[randomInt(opponents.length)];

    document.querySelector("#nav_player_name").innerText = username;
    document.querySelector("#nav_opp_name").innerText = opponent;
    document.querySelector("title").innerText = `${username} vs ${opponent}`;

    setTimeout(() => {
        switch (shipsNum) {
            case "8":
                document.querySelectorAll("#position_container div p")[1].innerText = "3x2"
                document.querySelectorAll("#position_container div p")[2].innerText = "1x3"
                document.querySelectorAll("#position_container div p")[3].remove();
                break;
            case "12":
                document.querySelectorAll("#position_container div p")[0].innerText = "5x1"
                document.querySelectorAll("#position_container div p")[1].innerText = "3x2"
                document.querySelectorAll("#position_container div p")[2].innerText = "2x3"
                document.querySelectorAll("#position_container div p")[3].innerText = "2x4"
                break;
            default:
                break;
        }
        //console.log(document.querySelectorAll("#position_container div p")[0].innerText)
    }, 10)

    //setTimeout(startAnimation, 1250);
    
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

