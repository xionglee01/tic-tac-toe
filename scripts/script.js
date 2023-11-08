

//PLAYER CREATE OBJECT
function createPlayer(name, symbol)
{
    let playerId = name;
    const sign = symbol;
    const getName = () => playerId;
    const setName = (newName) => playerId = newName; 
    const getSign = () => sign;
    return {getName, setName, getSign};
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

    const setPlayerName = function(player1, player2)
    {
        if(player1 === "")
        {
            player1 = "Player 1";
        }
        if(player2 === "")
        {
            player2 = "Player 2";
        }
        p1.setName(player1);
        p2.setName(player2);
    }

    const getPlayerName = function()
    {
        return {0:p1.getName(), 1:p2.getName()};
    }

    const currentTurn = () => p1Turn;
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

    const resetGame = function ()
    {
        p1Turn = true;
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

    return {playGame, resetGame, setPlayerName, getPlayerName, currentTurn};
})();


const displayController = (function dom()
{
    //CACHE DOM
    let squares = Array.from(document.querySelectorAll(".square"));
    const restart = document.querySelector(".restart");
    const modal = document.querySelector(".modal");
    const gameText = document.querySelector("#gameText");

    const board = document.querySelector("#board");

    const player1 = document.querySelector("#player1");
    const player2 = document.querySelector("#player2");
    const startBtn = document.querySelector("#start");
    const menu = document.querySelector("#menu");
    const showTurn = document.querySelector("#turn");

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

    const showcurrentTurn = function()
    {
        let names = gameController.getPlayerName();
        if(gameController.currentTurn())
        {
            showTurn.innerText = names[0] + " turn";
        }
        else
        {
            showTurn.innerText = names[1] + " turn";
        }
    }

    const startGame = function ()
    {
        board.classList.replace("non-visible", "visible");
        showTurn.classList.replace("non-visible", "visible");
        restart.classList.replace("non-visible", "visible");
        menu.classList.replace("visible", "non-visible");
        gameController.setPlayerName(player1.value, player2.value);
        showcurrentTurn();
    }
    const reset = function()
    {
        gameController.resetGame();
        boardController.clearBoard();
        clearDisplay();
        showcurrentTurn();
    }

    //BIND EVENT LISTENERS
    squares.forEach((square) =>
    {
        let index = squares.indexOf(square);
        square.addEventListener("click", function()
        { 
            gameController.playGame.bind(this)(index);
            showcurrentTurn();
        })
    });


    restart.addEventListener("click", function()
    {
        reset();
    });

    startBtn.addEventListener("click", function()
    {
        startGame();
    });

    window.addEventListener("click", function(e)
    {
        if(e.target === modal)
        {
            modal.classList.replace("visible", "non-visible");
            reset();
        }
    });

    //ACCESSIBLE FUNCTIONS 
    return{displayWin, showcurrentTurn};
})();
