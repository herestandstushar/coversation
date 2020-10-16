import React from 'react';
import './App.css';
import SideBar from './components/sidebar'
import Chat from './components/chat'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login  from './components/login'
import { useStatevalue } from './components/stateprovider';


function App() {
    const [ {user} , dispatch] =useStatevalue()
  return (
    <div className="App">
  {
    !user ? (
     <Login />
    ):(
  <div className = 'app__body'>
  <Router>
  <SideBar />
  <Switch> 
  <Route path = '/rooms/:roomId'>
  <Chat />
  </Route>  
  <Route path = '/'>
    <h2>Life is Awsm</h2>
  </Route> 


    </Switch>

    </Router>
    </div>
    )
  }
    </div>
  );
}

export default App;
