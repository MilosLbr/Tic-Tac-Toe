import React from 'react';

const ScoreTable = ({symbols, score, nextToPlay, gameMode, winner}) => {
    
    const {p1Symbol, p2Symbol} = symbols;
    const {p1Score, p2Score} = score;
    let player1, player2;

    let nextPlayer = nextToPlay === 'p1' ? 'Player 1' : 'Player 2';
    
    if(gameMode === 'vsComputer'){
        player1 = 'Human';
        player2 = 'Computer';
        nextPlayer = 'Human';
    }else{
        player1 = 'Player 1';
        player2 = 'Player 2';
    }
    
    return(
        <div className ='scoreDiv'>
            <h3 className = 'nextPlayer'>{nextPlayer} should play next</h3>
            <div className = 'scoresContainer'>
                <div className = { winner? 'playerScore blink' : 'playerScore'}>
                    {player1} ({p1Symbol}) :
                    <div className = 'scoreValue'>{p1Score}</div> 
                </div>
                <div className = { winner? 'playerScore blink' : 'playerScore'}>
                    {player2} ({p2Symbol}) : 
                    <div className = 'scoreValue'>{p2Score}</div>
                </div>
            </div>
        </div>

    )
}

export default ScoreTable;