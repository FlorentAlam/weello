import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Navigation from './js/components/Navigation/main/Navigation';
import Dashboard from './js/components/Dashboard/main/Dashboard';
import Tableau from './js/components/Tableaux/main/Tableau';
import { loadTableaux } from './redux/actions/tableaux';

class App extends React.Component{
  componentWillMount(){
    this.props.dispatch(loadTableaux());
  }
  render(){
    return(
      <div className="App">
        <Router>
          <Navigation/>
          <Route exact path="/" component={Dashboard}/>
          <Route path="/projet/:id" component={Tableau}/>
          {/*<Route path="/connection" component={Connection}/>
          <Route path="/inscription" component={Inscription}/> */}
        </Router>
      </div>
    )
  }
}

export default connect()(App);
