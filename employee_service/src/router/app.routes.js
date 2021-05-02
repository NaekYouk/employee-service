import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/home/home';
import EmployeesList from '../components/employees_list/employees_list';
import Profile from '../components/profile/profile';

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/employees" component={EmployeesList} />
      <Route path="/profile/:id" component={Profile} />
    </Switch>
  );
};

export default AppRoutes;
