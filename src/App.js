import React from 'react';
import SearchInputs from './SearchInputs';
// import MarketCheck from './MarketCheck';
import {withProvider} from './Provider'


const App = () => {
    return (
        <div>
            < SearchInputs />
        </div>
    )
}

export default withProvider(App);