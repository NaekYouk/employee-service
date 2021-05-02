import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/login/login';
import App from '../components/app/app';

const MainRoutes = () => {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
};

export default MainRoutes;
