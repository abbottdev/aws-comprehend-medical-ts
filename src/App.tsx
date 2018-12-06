import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as AWS from 'aws-sdk';

interface Props {

}

interface State {
  results?: AWS.ComprehendMedical.Entity[]
}

class App extends Component<Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = {};
    
    let client: AWS.ComprehendMedical;
    
    client = new AWS.ComprehendMedical({
      region: "eu-west-1",
      credentials: new AWS.Credentials({accessKeyId: '', secretAccessKey: ''})
    });

    client.detectEntities(
      { Text: "Mr Jone's blood glucose level was within normal range for type 1 diabetic."},
      (err, data) => {
        if (data) {
          this.setState({results: data.Entities});
        }
      });
  }

  render() {
    let { results } = this.state
    return (
      <div className="App">
        <header className="App-header">
          {results === undefined &&
            <div>Loading</div>};
          {results && results.length &&
            results.map(r => <div>{r.Text}</div>)}
        </header>
      </div>
    );
  }
}

export default App;
