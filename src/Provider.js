import React, { Component} from 'react'
import axios from 'axios'
const Context = React.createContext();





 


export default class Provider extends Component {
    state = {
     
    }

    componentDidMount(){
    
    }


axios.get((res) =>)


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
