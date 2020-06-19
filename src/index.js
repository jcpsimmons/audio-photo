import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import Magic from './Components/Magic'

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
      <Magic/>
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
