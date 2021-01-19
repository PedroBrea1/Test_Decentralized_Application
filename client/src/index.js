import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App2 from './App2';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<App2 />, document.getElementById('root4'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


class Employee extends React.Component {
    addEmployee=()=>{
      alert("adding a new employee");
    } 
    render(){
      return <div>
        <h1>Welcome</h1>
        <p>
          <button onClick={this.addEmployee}>Add employee</button>
        </p>
      </div>
    }
  }
  
  const element1 = <Employee></Employee>

  ReactDOM.render(element1, document.getElementById('root2'));


const element2 = <h1 className="a"> Hola </h1>

ReactDOM.render(element2, document.getElementById('root3'));