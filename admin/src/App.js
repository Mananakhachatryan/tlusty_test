import React, { Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Routes } from './routes';
import NavbarComponent from './Components/NavbarComponent/NavbarComponent';
import './App.css';

const App = () => {
  const renderSwitch = () => (
    <Switch>
      {Routes.map(route => {
        return (
          <Route
            key={route.path}
            exact={route.isExact || false}
            path={route.path}
            component={route.component}
          />
        );
      })}
    </Switch>
  );

  return (
    <Suspense maxDuration={5000}>
      <Router>
        <div id="main">
          <NavbarComponent />
          <Fragment>{renderSwitch()}</Fragment>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;

// export default () => <HydraAdmin entrypoint={process.env.REACT_APP_API_ENTRYPOINT}/>;
