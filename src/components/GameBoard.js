import React from 'react';
import Tile from './Tile.js';

const GameBoard = ({handleTileClick, board}) => {
    let tiles =[];
    for(let i = 0; i < board.length; i++){
        tiles.push(<Tile key = {i} idx ={i} symbol = {board[i]} handleTileClick = {handleTileClick}/>)
    };

    return(
        <div className = 'gameBoard'>{tiles}</div>
    )
}

export default GameBoard;