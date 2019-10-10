import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./firebase";
import Register from './components/Register/Register';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
