import React from 'react';
let apigee_marketcheck_cars = require('@datafire/apigee_marketcheck_cars').create();

apigee_marketcheck_cars.search({}).then(data => {
  console.log(data);
});
const MarketCheck = () => {
    return (
        <div>

        </div>
    )
}

export default MarketCheck;