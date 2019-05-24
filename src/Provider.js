import React, { Component} from 'react'
import axios from 'axios'
const Context = React.createContext();




const axiosConfig = {
    headers: {
    "content-Type": "application/json",
    "Host": "marketcheck-prod.apigee.net"
    },
    credentials: "same-origin"
}

export default class Provider extends Component {
    state = {
     
    }


    componentDidMount(){
        this.getData()
        console.log('fired')
    }


    getData =() => axios.get('https://marketcheck-prod.apigee.net/v1/search?start=0&rows=50&Content-Type="applications/json"&api_key=s29CT76B5A9lAOtHnImGs0u0AWrZ2JHo').then(res => {
        console.log('what')
        this.setState({
            data: res.data
        })
        console.log(res.data);
        console.log(this.state.data);
        console.log('anything')
        }).catch(error => {
            console.log(error);
            console.log('no');
        })
 

  render() {
    return (
      <div>
         <Context.Provider value={{
          getData: this.getData,   
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

// var MarketcheckCarsApi = require('marketcheck_cars_api');

// var api = new MarketcheckCarsApi.DealerApi()

// var latitude = 1.2; // {Number} Latitude component of location

// var longitude = 1.2; // {Number} Longitude component of location

// var radius = 56; // {Number} Radius around the search location

// var opts = { 
//   'apiKey': "apiKey_example", // {String} The API Authentication Key. Mandatory with all API calls.
//   'rows': 50, // {Number} Number of results to return. Default is 10. Max is 50
//   'start': 1 // {Number} Offset for the search results. Default is 1.
// };

// var callback = function(error, data, response) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('API called successfully. Returned data: ' + data);
//   }
// };
// api.dealerSearch(latitude, longitude, radius, opts, callback);