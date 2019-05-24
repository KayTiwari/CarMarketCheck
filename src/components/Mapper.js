import React from 'react';

const Mapper = (props) => {
    console.log(props)
    return (
        <div style={{border: `10px solid ${props.color}`}}>
            <h1>Make: {props.make}</h1>
            <h1>Model: {props.model}</h1>
            <h2>Year: {props.year}</h2>
            <h2 style={props.price < 10000 ? {color: 'green'} : {color: 'red'}}>Price: {props.price ? props.price : 'Undefined'}</h2>
            <h2>Miles: {props.miles}</h2>
            <h2>Url: <a href={props.url}>{props.heading}</a></h2>
        </div>
    )
}

export default Mapper;