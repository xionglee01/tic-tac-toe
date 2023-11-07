

//PLAYER CREATE OBJECT
function createPlayer(name, symbol)
{
    const playerId = name;
    const sign = symbol;
    const getName = () => playerId;
    const getSign = () => sign;
    return {getName, getSign};
}


//BOARD OBJECT
const boardController = (function createBoard()
{
    //BOARD
    let board = ["", "", "", 
                "", "", "", 
                "", "", ""];
    let msquare = [4, 9, 2, 3, 5, 7, 8, 1, 6];
    let count = 0;
    //METHODS
    const getBoard = function (){
        return board;
    }
    const getSquareValue = function ()
    {
        return msquare;
    }
    const setMarker = function(player, ele)
    {
        board[ele] = player.getSign();
        count++;
    }

    const getCount = function()
    {
        return count;
    }

    const clearBoard = function ()
    {
        for(let i = 0; i < board.length; i++)
        {
            board[i] = "";
        }
        count = 0;
    }
    return {getBoard, getSquareValue, setMarker, getCount, clearBoard};
})();

const gameController = (function game()
{
    const p1 = createPlayer("Player 1", "X");
    const p2 = createPlayer("Player 2","O");
    let p1Turn = true;
    const checkWin = function ()
    {
        if(hasWon(p1)) {
            displayController.displayWin(p1.getName());
        }
        else if(hasWon(p2)) 
        {
            displayController.displayWin(p2.getName());
        }
        else if(boardController.getCount() === 9) 
        {
            displayController.displayWin();
        }
    }

    const hasWon = function (player)
    {
        let gboard = boardController.getBoard()
        let size = gboard.length;
        let sign = player.getSign();
        let msquare = boardController.getSquareValue();
        for(let i = 0; i < size; i++)
        {
            for(let j = 0; j < size; j++)
            {
                for(let k = 0; k < size; k++)
                {
                    if(i != j && i != k && j != k)
                    {
                        if(gboard[i] === sign && gboard[j] === sign && gboard[k] === sign)
                        {
                            if(msquare[i] + msquare[j] + msquare[k] === 15)
                            {
                                return true;
                            }
                         }
                    }
                }
            }
        }
        return false;
    }

    const playGame = function (index)
    {
        if(p1Turn)
        {   if(boardController.getBoard()[index] === "")
            {
                this.innerText = p1.getSign();
                boardController.setMarker(p1, index);
                p1Turn = false;
            }
            else
            {
                alert("VALUE ALREADY TAKEN");
            }
        }
        else
        {
            if(boardController.getBoard()[index] === "")
            {
                this.innerText = p2.getSign();
                boardController.setMarker(p2, index);
                p1Turn = true;
            }
            else
            {
                alert("VALUE ALREADY TAKEN");
            }
        }
        checkWin();
    }
    return {playGame};
})();


const displayController = (function dom()
{
    //CACHE DOM
    let squares = Array.from(document.querySelectorAll(".square"));
    const restart = document.querySelector(".restart");
    const modal = document.querySelector(".modal");
    const gameText = document.querySelector("#gameText");

    const clearDisplay = function ()
    {
        squares.forEach((square) =>
        {
            square.innerText = "";
        });
    }

    const displayWin = function (arg)
    {
        if(modal.classList.contains("non-visible"))
        {
                modal.classList.replace("non-visible", "visible");
                if(typeof arg === "string")
                {
                    gameText.innerText = arg + " WINS!";
                }
                else
                    gameText.innerText = "The game was a TIE!";
        }
    }
    //BIND EVENT LISTENERS
    squares.forEach((square) =>
    {
        let index = squares.indexOf(square);
        square.addEventListener("click", function()
        { 
            gameController.playGame.bind(this)(index);
        })
    });
    restart.addEventListener("click", function()
    {
        boardController.clearBoard();
        clearDisplay();
    });

    window.addEventListener("click", function(e)
    {
        if(e.target === modal)
        {
            modal.classList.replace("visible", "non-visible");
            clearDisplay();
            boardController.clearBoard();
        }
    });
    return{displayWin};
})();
