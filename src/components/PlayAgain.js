import React from 'react'

const PlayAgain = ({playAgain}) => {
    return(
        <div >
            <span>Play again? &nbsp;</span>
             <button className = 'btn btn-playAgain btn-yes' onClick = {playAgain} data-react-playagain = 'yes'>&#10004;</button>  {/* checkbutton */}
             <button className = 'btn btn-playAgain btn-no' onClick = {playAgain} data-react-playagain = 'no'> &#10008;</button>  {/* X button */}
        </div>
    )
}

export default PlayAgain;