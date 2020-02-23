import React from "react";
import "./styles.css";
import SearchPage from "./container/searchpage";
import SearchDetialPage from './container/searchpagedetialpage'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <SearchPage />
          </Route>
          <Route path='/searchdetail/:type/:id' exact={true}>
            <SearchDetialPage/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}
