import React from 'react';

const Tile = ({symbol, handleTileClick, idx}) => {
    let  allClasses = 'tile '

    switch(idx){
        case 0:
            allClasses += 'top left ';
            break;
        case 1:
            allClasses += 'top '
            break;
        case 2:
            allClasses += 'top right ';
            break;
        case 3:
            allClasses += 'left ';
            break;
        case 5:
            allClasses += 'right ';
            break;
        case 6:
            allClasses += 'bottom left ';
            break;
        case 7:
            allClasses += 'bottom ';
            break;
        case 8:
            allClasses += 'bottom right '
            break;
    }   
    
    
    return(
        <div className={allClasses}  onClick={handleTileClick} idx={idx}><span>{symbol}</span></div>
    )
}

export default Tile;