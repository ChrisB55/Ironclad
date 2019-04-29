import React from 'react';
import events from 'events'
import ajax from './ajax'
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nodes: []
    };
  }
  render() {
    return (
      <div className="App">
        <div>Ironclad Headless </div>

        <div> Create Nodes Component </div>


        <div> List of Nodes Component </div>

        <div>Basic Info: This app is a React based App that can can interact with the associated Drupal installation, if the user is logged in with appropriate user permissions. It uses axios and the
RESTful Web Services, serialization  and a custom module to enable the data to move between applications without triggering a CORS error. </div>
      </div>
    );
  }
}


export default App;
