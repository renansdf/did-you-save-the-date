import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Rules from '../pages/Rules';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Rules} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
