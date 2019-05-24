import React from 'react';
import SearchInputs from './SearchInputs';
import {withProvider} from './Provider'


const App = () => {
    return (
        <div>
            < SearchInputs />
        </div>
    )
}

export default withProvider(App);