import React from 'react';
import SearchInputs from './SearchInputs';
import MarketCheck from './MarketCheck';
import Provider from './Provider'


const App = () => {
    return (
        <Provider>
        <div>
            < SearchInputs />
            < MarketCheck />
        </div>
        </Provider>
    )
}

export default App;