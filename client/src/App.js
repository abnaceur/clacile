import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './middleWare/PrivateRoute';

import TestRedux from './Test/Test.redux';
import Home from './page/Home/Home.component';
import CreateClass from './page/Classroom/CreatClass.component';
import MaClass from './page/MaClass/MaClass.components';

export default function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Router forceRefresh={false}>
        <Switch>
          <Route  exact path="/" component={Home} />
          <Route  exact path="/createClass" component={CreateClass} />
          <Route  exact path="/class/:title/:token" component={MaClass} />
        </Switch>
      </Router>
    </div>
  );
}
