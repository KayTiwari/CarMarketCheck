import React from 'react';
let apigee_marketcheck_cars = require('@datafire/apigee_marketcheck_cars').create();

apigee_marketcheck_cars.search({}).then(data => {
  console.log(data);
});
const MarketCheck = () => {
    console.log(apigee_marketcheck_cars);
    return (
        <div>

        </div>
    )
}

export default MarketCheck;