import React, {Component} from 'react';
import Mapper from './components/Mapper';
import {withProvider} from './Provider'
import { throwStatement } from '@babel/types';

let MappedCars;
let MappedCars2;
class CarsMap extends Component{
    state = {

    }

    render(props){
        console.log(this.props.data)
        if (this.props.data && this.props.data2) {
        if (this.props.data.listings && this.props.data2.listings) {
            MappedCars = this.props.data.listings.map((data) => {return (<Mapper color={'black'} make={data.build.make} model={data.build.model} year={data.build.year} price={data.price} miles={data.miles} url={data.vdp_url} heading={data.heading} />)})
            MappedCars2 = this.props.data2.listings.map((data) => {return (<Mapper color={'#333'} make={data.build.make} model={data.build.model} year={data.build.year} price={data.price} miles={data.miles} url={data.vdp_url} heading={data.heading} />)})
        }

    }
        return(
            <div>
                {MappedCars}
                {MappedCars2}
                {/* {this.props.data ? <Mapper make={this.props.data.listings[0].build.make} model={this.props.data.listings[0].build.model} year={this.props.data.listings[0].build.year} price={this.props.data.listings[0].price} miles={this.props.data.listings[0].miles} url={this.props.data.listings[0].vdp_url} /> : null} */}
            </div>
        )
    }
}

export default withProvider(CarsMap);