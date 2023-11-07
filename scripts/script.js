
//BOARD OBJECT
function createBoard ()
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
}


//PLAYER CREATE OBJECT
function createPlayer (symbol)
{
    const sign = symbol;
    const getSign = () => sign;
    return {getSign};
}

function game ()
{
    const p1 = createPlayer("X");
    const p2 = createPlayer("O");
    let board = createBoard();
    let p1Turn = true;
    let gameOver = false;

    //CACHE DOM
    let squares = Array.from(document.querySelectorAll(".square"));
    const restart = document.querySelector(".restart");

    const checkWin = function ()
    {
        if(hasWon(p1)) {
            alert("Player1 Won!");
        }
        else if(hasWon(p2)) 
        {
            alert("Player2 Won!");
        }
        else if(board.getCount() === 9) 
        {
            alert("Game is TIED!");
        }

    }

    const hasWon = function (player)
    {
        let gboard = board.getBoard()
        let size = gboard.length;
        let sign = player.getSign();
        let msquare = board.getSquareValue();
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
        {   if(board.getBoard()[index] === "")
            {
                this.innerText = p1.getSign();
                board.setMarker(p1, index);
                p1Turn = false;
            }
            else
            {
                alert("VALUE ALREADY TAKEN");
            }
        }
        else
        {
            if(board.getBoard()[index] === "")
            {
                this.innerText = p2.getSign();
                board.setMarker(p2, index);
                p1Turn = true;
            }
            else
            {
                alert("VALUE ALREADY TAKEN");
            }
        }
        checkWin();
        // console.log(board.getBoard());
    }
    
    //BIND EVENT LISTENERS
    squares.forEach((square) =>
    {
        let index = squares.indexOf(square);
        square.addEventListener("click", function()
        {
            playGame.bind(this)(index);
        });
    })

    restart.addEventListener("click", function()
    {
        board.clearBoard();
        squares.forEach((square) =>
        {
            square.innerText = "";
        });
    });
}


let g = game();