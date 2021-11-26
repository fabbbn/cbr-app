import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageInput from "./pages/PageInput";
import PageResult from "./pages/PageResult";
import PageNoMatch from "./pages/PageNoMatch";


function App() {
  return (
    <>
      <Router>
      <Switch>
        <Route path='/' exact component={PageInput} />
        <Route path="/hasil/*" component={PageResult}/>
        <Route component={PageNoMatch}/>
      </Switch>
    </Router>
    </> 
  );
}

export default App;
