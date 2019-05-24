import React, {Component} from 'react';
import SearchInputs from './SearchInputs';
import {withProvider} from './Provider'
import CarsMap from './CarsMap';


class App extends Component{
    state = {

    }


    render(){
        return (
            <div>
            <SearchInputs />
            <button onClick={() => this.props.getData()} >Get listings</button>
            <CarsMap />
            </div>
        )
    }
}

export default withProvider(App);