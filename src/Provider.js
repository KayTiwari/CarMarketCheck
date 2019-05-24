import React, { Component} from 'react'
import axios from 'axios'
const Context = React.createContext();





 


export default class Provider extends Component {
    state = {
     
    }

    componentDidMount(){
    
    }


axios.get(('http://api.marketcheck.com/v1//search?api_key=s29CT76B5A9lAOtHnImGs0u0AWrZ2JHo&year=2007&make=honda&start=0&rows=50&Content-Type="applications/json"') => (data) =>{
  console.log(data);
})


  render() {
    return (
      <div>
         <Context.Provider value={{ 
          ...this.props,
          ...this.state}}>
        {this.props.children}
      </Context.Provider>
      </div>
    )
  }
}

export function withProvider(C) {
  return props => <Context.Consumer>
    {value => <C {...value}{...props} />}
  </Context.Consumer>
}
