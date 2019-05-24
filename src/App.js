import React, {Component} from 'react';
import SearchInputs from './SearchInputs';
import {withProvider} from './Provider'


class App extends Component{
    state = {

    }


    render(){
        return (
            <SearchInputs />
        )
    }
}

export default withProvider(App);