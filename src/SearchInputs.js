import React, {Component} from 'react';

class SearchInputs extends Component{
    state = {
        make: '',
        model: '',
        year: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(event) {
        alert('A name was submitted')
        event.preventDefault();
      }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Make: 
                        <input type="text" name={this.state.make} onChange={this.handleChange} />
                    </label>
                    <label>
                        Model: 
                        <input type="text" name={this.state.model} onChange={this.handleChange} />
                    </label>
                    <label>
                        Year: 
                        <input type="text" name={this.state.year} onChange={this.handleChange} />
                    </label>
                    <input type='submit' value='Submit' />
                </form>
            </div>
        )
    }
}
// Make
// Model
// Year 
// Mileage
// Price

export default SearchInputs;