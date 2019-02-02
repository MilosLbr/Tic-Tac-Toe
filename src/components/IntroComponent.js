import React from 'react';

const IntroComponent = ({chooseGameMode}) => {
    return(
        <div className = 'introComponentContainer'>
            <div className = 'introComponent'>
                <h2>How would you like to play?</h2>
                <button className='btn btn-left' datareact-gamemode = 'vsComputer' onClick={chooseGameMode}>VS Computer</button>
                <button className='btn btn-right' datareact-gamemode = 'vsPlayer' onClick={chooseGameMode}>VS Another Player</button>
            </div>
            
        </div>
    )
}

export default IntroComponent;