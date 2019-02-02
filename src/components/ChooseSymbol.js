import React from 'react';

const ChooseSymbol = ({chooseGameSymbol}) => {
    return(
        <div className = 'introComponentContainer'>
            <div className = 'introComponent height40'>
                <h2>Choose your symbol :</h2>
                <button className ='btn btn-left symbolBtn-left' datareact-symbol ='X' onClick = {chooseGameSymbol}>X</button>
                <button className ='btn btn-right symbolBtn-right' datareact-symbol ='O' onClick = {chooseGameSymbol}>O</button>
            </div>
        </div>
    )
}

export default ChooseSymbol;