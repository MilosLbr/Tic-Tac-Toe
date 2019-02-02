import React, { Component } from 'react';
import IntroComponent from './IntroComponent.js';
import ScoreTable from './ScoreTable.js';
import ChooseSymbol from './ChooseSymbol';
import GameBoard from './GameBoard.js';
import WInnerIs from './WinnerIs.js';
import PlayAgain from './PlayAgain.js';


class App extends Component{
    constructor(props){
        super(props);
        this.state ={
            board: new Array(9).fill(''),
            showIntroDiv: true,
            gameMode: undefined,
            symbolsAreChosen: false,
            symbols: {
                p1: '',
                p2: ''
            },
            nextToPlay: 'p1',
            firstToPlay: '',
            score: {
                p1: 0,
                p2: 0
            },
            gameOver: false,
            winner: undefined,
            thanksForPlaying: false

        }
        this.handleTileClick = this.handleTileClick.bind(this);
        this.chooseGameMode = this.chooseGameMode.bind(this);
        this.chooseGameSymbol = this.chooseGameSymbol.bind(this);
        this.firstPlayerToPlay = this.firstPlayerToPlay.bind(this);
        this.checkWin = this.checkWin.bind(this);
        this.checkDraw = this.checkDraw.bind(this);
        this.computerMove = this.computerMove.bind(this);
        this.playAgain = this.playAgain.bind(this);
    }

    chooseGameMode(){
        this.setState(prevState => {
            let chosenGameMode = event.target.getAttribute('datareact-gamemode');
            let showIntroDiv = false;

            return {
                showIntroDiv,
                gameMode: chosenGameMode
            }
        })
    }

    chooseGameSymbol(){
        this.setState(prevState => {
            const {symbols, gameMode} = prevState;
            const board = prevState.board.slice()
            let {p1, p2} = symbols;


            const chosenSymbol = event.target.getAttribute('datareact-symbol');
            p1 = chosenSymbol;

            p1 === 'X' ? p2 = 'O' : p2='X';
            const symbolsAreChosen = true;

            let nextToPlay = this.firstPlayerToPlay();

            let firstToPlay = nextToPlay;
            
            if(gameMode === 'vsComputer' && firstToPlay === 'p2'){
                // if it is computer's first move in computer mode , play it
                let computerMove = this.computerMove(p2, board, firstToPlay);
                
                board[computerMove] = p2;
                nextToPlay = 'p1';
            }

            return {
                symbolsAreChosen,
                symbols : {
                    p1,
                    p2
                },
                nextToPlay,
                firstToPlay,
                board
            };
        })
    };

    firstPlayerToPlay(){
            let players = ['p1', 'p2'];
            
            let randomPlayer = players[Math.floor(Math.random()*players.length)];

            return randomPlayer;
    }

    handleTileClick(){
        const index = event.target.getAttribute('idx');

        this.setState(prevState => {
            const board = prevState.board.slice();  // copy of the board from app's state
            let {firstToPlay, gameMode, score, gameOver, winner} = prevState;
            let nextToPlay = prevState.nextToPlay;
            let playerScore = prevState.score[nextToPlay]; // score of the Player that shoul play next
            const symbol = prevState.symbols[nextToPlay];  // symbol of the Player that should play next

            if(!gameOver){
                if(board[index] === '' && gameMode === 'vsPlayer'){ // two players on one computer
                    // valid move if a tile is empty
                    board[index] = symbol;
    
                    if(this.checkWin(symbol, board)){  // first check if player has won
                        playerScore += 1;
                        score[nextToPlay] = playerScore;
                        gameOver = true;
                        winner = nextToPlay === 'p1' ? 'Player 1' : 'Player 2';

                    }else if(this.checkDraw(board)){  // else, check if the board is full and it is a draw

                        gameOver = true;
                        winner = 'Draw';

                    }else{  // else the other player should play
                        nextToPlay = nextToPlay === 'p1' ? 'p2' : 'p1';
                    }
    
                }else if(board[index] === '' && gameMode === 'vsComputer'){  // play Human's move first
                    let p2 = prevState.symbols['p2']; // computer's symbol
                    let computerScore = score['p2'];

                    board[index] = symbol;  // Human's move

                    if(this.checkWin(symbol, board)){

                        playerScore +=1;
                        score[nextToPlay] = playerScore;
                        gameOver = true;
                        winner = 'Human';

                    }else if(this.checkDraw(board)){

                        gameOver = true;
                        winner = 'Draw';

                    }else{  // play Computer's move
                        
                        const computerMove = this.computerMove(p2, board, firstToPlay);    
                        board[computerMove] = p2;

                        if(this.checkWin(p2, board)){

                            computerScore +=1;
                            score['p2'] = computerScore;
                            gameOver = true;
                            winner = 'Computer';

                        }else if(this.checkDraw(board)){

                            gameOver = true;
                            winner = 'Draw';

                        }else{  // if computer didn't win and it is not draw, next to play is Human (p1)
                            nextToPlay = 'p1';
                        }

                    }
                }  
            }

            return {
                board,
                nextToPlay,
                score,
                gameOver,
                winner
            };
        })
        
    }

    checkWin(symbol, board){
        // checks winning combinations for given symbol on the current board
        return(
            (board[0] == board[1] && board[1] == board[2] && board[2] == symbol) ||
            (board[3] == board[4] && board[4] == board[5] && board[5] == symbol) ||
            (board[6] == board[7] && board[7] == board[8] && board[8] == symbol) ||
            (board[6] == board[3] && board[3] == board[0] && board[0] == symbol) ||
            (board[7] == board[4] && board[4] == board[1] && board[1] == symbol) ||
            (board[8] == board[5] && board[5] == board[2] && board[2] == symbol) ||
            (board[6] == board[4] && board[4] == board[2] && board[2] == symbol) ||
            (board[8] == board[4] && board[4] == board[0] && board[0] == symbol)   
        )
    }

    checkDraw(board){
        let boardSymbols = board.filter(el => el.match(/X|O/));
        // checks if the whole board is filled with symbols
        if(boardSymbols.length === 9){
            return true;
        }else{
            return false;
        }
    }

    computerMove(computerSymbol, board, firstToPlay){
        const humanSymbol = computerSymbol === 'X' ? 'O' : 'X';
        let boardCopy = board.slice();
        
        for (let i = 0; i < 9; i++){
            // make a winning move, if any
            let boardCopy = board.slice();

            if(boardCopy[i] === ''){
                boardCopy[i] = computerSymbol;
                if(this.checkWin(computerSymbol, boardCopy)){
                    return i;
                }
            }
        }
        for (let i = 0; i < 9; i++){
            // block human's winning move, if any
            let boardCopy = board.slice();

            if(boardCopy[i] === ''){
                boardCopy[i] = humanSymbol; // checks human's next move

                if(this.checkWin(humanSymbol,boardCopy)){
                    return i;
                }
            }
        }
        if (firstToPlay === 'p1' && boardCopy[4] === ''){
            // play in the middle if it is Human's first move
            return 4;
        }

        let diagonals = [0,2,6,8];
        let possibleMoves = [];
        for(let i = 0; i< 4; i++){
            if(boardCopy[diagonals[i]] === ''){
                possibleMoves.push(diagonals[i])
            }
        }

        let randomMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
        
        if(randomMove !== undefined){
            // play random diagonal if available
            return randomMove;
        }else{
            // play random side
            possibleMoves = [1,3,5,7]
            return possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
        }

    };

    playAgain(){
        this.setState(prevState => {
            let board = prevState.board.slice();
            let {gameMode, symbols, gameOver, winner, nextToPlay, firstToPlay} = prevState;

            switch(event.target.getAttribute('data-react-playagain')){
                case 'yes':
                    board = new Array(9).fill('');
                    gameOver = false;
                    winner = undefined;
                    nextToPlay = this.firstPlayerToPlay();  // asign random player to play first
                    firstToPlay = nextToPlay;

                    if(gameMode === 'vsComputer' && firstToPlay === 'p2'){
                        // if it is computer's first move in computer mode , play it
                        let p2 = symbols['p2']; // computer's symbol
                        let computerMove = this.computerMove(p2, board, firstToPlay);
                        
                        board[computerMove] = p2;
                        nextToPlay = 'p1';
                    }

                    return{
                        board,
                        gameOver,
                        winner,
                        nextToPlay,
                        firstToPlay
                    }
                case 'no':
                    return{
                        winner: undefined,
                        thanksForPlaying: true
                    }
            }
        });
    }


    render(){
        const board = this.state.board.slice();
        const showIntroDiv = this.state.showIntroDiv;
        const gameMode = this.state.gameMode;
        const symbolsAreChosen = this.state.symbolsAreChosen;
        const nextToPlay = this.state.nextToPlay;
        const p1Symbol = this.state.symbols.p1;
        const p2Symbol = this.state.symbols.p2;
        const p1Score = this.state.score.p1;
        const p2Score = this.state.score.p2;
        const winner = this.state.winner;
        const thanksForPlaying = this.state.thanksForPlaying;

        return(
            <div >

                <div className = {winner? 'headerDiv blink' : 'headerDiv'}>
                    {winner && <WInnerIs winner = {winner}/>}
                    {winner && <PlayAgain playAgain = {this.playAgain}/>}
                </div>

                {thanksForPlaying && 
                <div className = 'headerDiv blink'>
                    Thanks for playing!
                </div>
                }
               
                <div className='container'>
                    {
                        showIntroDiv && <IntroComponent chooseGameMode = {this.chooseGameMode}/>
                    }

                    {
                        !symbolsAreChosen && !showIntroDiv && <ChooseSymbol chooseGameSymbol={this.chooseGameSymbol}/>
                    }

                    {
                        !showIntroDiv && symbolsAreChosen &&
                        <GameBoard board= {board} handleTileClick = {this.handleTileClick}/>
                    }


                </div>
                
                <ScoreTable symbols={{p1Symbol, p2Symbol}} score={{p1Score, p2Score}} gameMode={gameMode} nextToPlay ={nextToPlay} winner = {winner}/>

            </div>
        )
    }
};

export default App;