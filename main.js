const CLASS_X = "X"
const CLASS_O ="O"
const WINNING_COMBINATION_ARRAY = [
                                     [0,1,2],
                                     [3,4,5],
                                     [6,7,8],
                                     [0,3,6],
                                     [1,4,7],
                                     [2,5,8],
                                     [0,4,8],
                                     [2,4,6],
                                    ]

const cellElements = document.querySelectorAll("[data-cell]");
const gameBoard = document.getElementById("game-board");
const winningMessageContainer = document.getElementById("winning-message-container");
const dataWinningMessage = document.querySelector("[data-winning-message]");
const restartBtn = document.getElementById("restart-btn");

let turn;



startGame();



function startGame(){
    turn = CLASS_X;
    winningMessageContainer.classList.remove("show");
    cellElements.forEach((cell)=>{
        cell.classList.remove(CLASS_O);
        cell.classList.remove(CLASS_X);
        cell.addEventListener("click",handleClick,{once:true});    
    });
    addHoverToGameBoard();
}


restartBtn.addEventListener("click",startGame);

function handleClick(e){
    targetedCell = e.target;

    placeMark(targetedCell,turn);
    if(checkWinner()){
        endGame(false);
    }
    else if(checkDraw()){
        endGame(true)
    }
    else{
        swapTurns();
        addHoverToGameBoard();
    }
}

function placeMark(cell){
    cell.classList.add(turn);
}

function swapTurns(){
    turn = turn === CLASS_X ? CLASS_O : CLASS_X;
}

function addHoverToGameBoard(){
    gameBoard.classList.remove(CLASS_X)
    gameBoard.classList.remove(CLASS_O)
    gameBoard.classList.add(turn);
}

function checkWinner(){
    
    return WINNING_COMBINATION_ARRAY.some((combination) => {
        return combination.every((ele)=>{
            return cellElements[ele].classList.contains(turn);
        })
    })

}

function checkDraw(){
    return Array.from(cellElements).every((cell)=>{
       return cell.classList.contains(CLASS_O)|| cell.classList.contains(CLASS_X);
    });
   
}

function endGame(isDraw){
    if(isDraw){
        dataWinningMessage.innerText = `Draw!`
    }
    else{
        dataWinningMessage.innerText = `${turn}Wins!`
    }
    winningMessageContainer.classList.add("show");
}