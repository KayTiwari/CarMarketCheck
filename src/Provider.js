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
        this.getData2()
        this.getData3()
        this.getData4()
    }


    getData =() => axios.get('http://marketcheck-prod.apigee.net/v1/search?api_key=s29CT76B5A9lAOtHnImGs0u0AWrZ2JHo&make=&car_type=used&city=Salt Lake City&zip=&sort_by=year&start=0&rows=10').then(res => {
        console.log('what')
        this.setState({
            data: res.data
        })
        console.log(res.data);
        console.log(this.state.data);
        return 0;
        }).catch(error => {
            console.log(error);
            console.log('no');
        })
    getData2 =() => axios.get('http://marketcheck-prod.apigee.net/v1/search?api_key=s29CT76B5A9lAOtHnImGs0u0AWrZ2JHo&make=&car_type=used&city=Salt Lake City&zip=&year=2011&start=10&rows=10').then(res => {
        console.log('what')
        this.setState({
            data2: res.data
        })
        return 0;
        }).catch(error => {
            console.log(error);
            console.log('no');
        })
    getData3 =() => axios.get('http://marketcheck-prod.apigee.net/v1/search?api_key=s29CT76B5A9lAOtHnImGs0u0AWrZ2JHo&make=&car_type=used&city=Salt Lake City&zip=&start=20&rows=10').then(res => {
        this.setState({
            data3: res.data
        })
        return 0;
        }).catch(error => {
            console.log(error);
        })
    getData4 =() => axios.get('http://marketcheck-prod.apigee.net/v1/search?api_key=s29CT76B5A9lAOtHnImGs0u0AWrZ2JHo&make=&car_type=used&city=Salt Lake City&zip=&start=30&rows=10').then(res => {
        this.setState({
            data4: res.data
        })
        return 0;
        }).catch(error => {
            console.log(error);
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