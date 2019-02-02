import React from 'react';

const WinnerIs = ({winner}) => {
    let divText;
    const drawCaseText = 'It was a draw...';
    const winCaseText = `${winner} is the winner!`;
    let className = 'winnerText'

    if(winner.match(/1|2|H|C/)){
        divText = winCaseText;
        className += ' blink';
    }else if(winner.match('Draw')){
        divText = drawCaseText;
        className +=' blink'
    }

    return(
        <div>
            <span className = {className}>{divText}</span>
        </div>
    )
};

export default WinnerIs;