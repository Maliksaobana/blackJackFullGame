/* 
    * the player register his name
    *the initial score is zero
    *the player draws two card at start of the game
    *the cards are summed together to give the total
    *the player wins if his total card drawn is 21
    * initiate the game sequence
    * get the side menu to display the user name and region;
    * using add card and it works it doesnt add again need to work on it[fixed it by redeclaring the status it follows]
    * now moving on to implenting the reward section
    * now lets add the event for the menu section
    * now let implement the rounds increase
    * push now to github
*/

const startGame = document.querySelector(".start"),
      drawCard = document.querySelector(".draw"),
      beginGame = document.querySelector(".begin"),
      showGame = document.querySelector(".content"),
      mainMenu = document.querySelector(".userinput"),
      showMenuOutside = document.querySelector(".outside"),
      closeMenuOutside = document.querySelector(".outsidemenu"),
      sideBarInside = document.querySelector(".original"),
      outsideMenu = document.querySelector(".outsider"),
      showMenuInside = document.querySelector(".insider"),
      closeMenuInside = document.querySelector(".insidemenu"),
      userName = document.getElementById("inputname"),
      stakeRate = document.getElementById("stakerate"),
      playerRegion = document.getElementById("selectregion"),
      forTheMenu = document.querySelectorAll(".things");
let showCards = document.querySelector(".showcards"),
    playerScoresDisplay = document.querySelector(".gamemode p"),
    gameScoreNotification  = document.querySelector(".score h4"),
    gameRewardSection = document.querySelector(".score span"),
    playerBalance = document.querySelector(".score p"),
    roundIncrease = document.querySelector(".gamemode h2"),
    playerName = document.querySelectorAll(".userNam h5"),
    playerOwnRegion = document.querySelectorAll(".userNam h6")

/* blackjack is a card game where players pick card s till the total cards is equal to 21 and if its above twenty one the player fails that round */


// section for displaying user name and region for the game

let gameMoney = 25,
    differentRounds = 1;


function inputSettings(){
    playerName.forEach(item =>{
        item.textContent = userName.value
    })
    playerOwnRegion.forEach(item =>{
        item.textContent = playerRegion.value
    })
}

let initialCash;

beginGame.addEventListener("click", ()=>{
    showGame.classList.toggle("nextScreen")
    mainMenu.classList.toggle("nextScreen")
    inputSettings()
    initialCash = Number(stakeRate.value);
    playerBalance.textContent = `balance: $${stakeRate.value}`
    roundIncrease.textContent = `round ${differentRounds}`;
})

function toggleMenu(){
    sideBarInside.classList.toggle("showmenu")
    // console.log(outsideMenu)
    // console.log("hello world")
}
function toggleMenuOutside(){
    outsideMenu.classList.toggle("showmenu")
    // console.log(outsideMenu)
    // console.log("hello world")
}

showMenuInside.onclick = toggleMenu;
closeMenuInside.onclick = toggleMenu;
showMenuOutside.onclick = toggleMenuOutside;
closeMenuOutside.onclick = toggleMenuOutside;


// implenting game reward section 

gameRewardSection.textContent = `you earn: `


function stakeBalance(){
    if(playerWin){
        try{
            initialCash += gameMoney
            playerBalance.textContent = `balance: $${initialCash}`
        }catch(err){
            console.log(err.message)
        }
    }
}




forTheMenu.forEach(item =>{
    item.addEventListener("click",(e)=>{
        if(e.target.textContent === "menu"){
            showGame.classList.add("nextScreen");
            mainMenu.classList.remove("nextScreen");
            toggleMenu()
        }else{
            return
        }
    })
})



let playerWin = false,
    gameOver = true,
    playerScores = 0,
    totalSum = '',
    numbersOfCards = [];

showCards.style.display = "none"


function randomNumber(){
    let randomness = Math.floor(Math.random() *  13) + 1//adds one so it begins from number one
    if(randomness > 10){
        return 10
    }else if(randomness === 1){
        return 11
    }else{
        return randomness
    }
}

function cardsOnDeck(){
    gameOver = true;
    playerWin = false;
    drawCard.disabled = false;
    drawCard.classList.remove("nodraw")
     let value1 = randomNumber(),
         value2 = randomNumber();
    numbersOfCards = [value1,value2]
    totalSum = value1 + value2
    cardDisplay()
    differentRounds++;
    roundIncrease.textContent = `round ${differentRounds}`
}

function cardDisplay(){
    showCards.style.display = "block"
    showCards.textContent = "cards: "

        for(let i =0; i < numbersOfCards.length; i++){
            showCards.textContent += numbersOfCards[i] + ' ' 
        }

        if(totalSum <= 20){
            gameScoreNotification.textContent = "do you need an card";
            playerScoresDisplay.textContent = totalSum
            playerScoresDisplay.style.color = "black";
            gameScoreNotification.style.color = "black"
            gameRewardSection.textContent = `you earn: `
        }else if(totalSum === 21){
            playerWin = true;
            gameScoreNotification.textContent = "you win"
            playerScoresDisplay.textContent = totalSum;
            drawCard.disabled = true;
            drawCard.classList.toggle("nodraw");
            playerScoresDisplay.style.color = "green";
            gameScoreNotification.style.color = "green";
            gameRewardSection.textContent = `you earn: $${gameMoney}`;
            stakeBalance()
        }else{
            gameOver = false
            playerScoresDisplay.textContent = totalSum
            drawCard.disabled = true;
            drawCard.classList.toggle("nodraw")
            gameScoreNotification.textContent = "game over";
            playerScoresDisplay.style.color = "black";
            gameScoreNotification.style.color = "black";
            gameRewardSection.textContent = `you earn: $0`
        }
}

function addNewCard(){
    if(playerWin === false && gameOver === true){
        let newCard = randomNumber();
                
        totalSum += newCard

        numbersOfCards.push(newCard);

        cardDisplay()
    }
        
}

startGame.addEventListener("click", cardsOnDeck)
drawCard.addEventListener("click",addNewCard)

