import './App.css';
import React, { Suspense } from 'react';
import HeaderBar from './Components/HeaderBar';
import useToken from './Hooks/useToken';
import { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { tokenDecoder } from './Utils/httpRequestMaker';
import CircularProgress from '@material-ui/core/CircularProgress';


const Login = React.lazy(() => import('./Pages/Login'));
const Dashboard = React.lazy(() => import('./Pages/UserDashboard/Dashboard'));
const AdminDashboard = React.lazy(() => import('./Pages/AdminDashboard/Dashboard'));

function App() {

  const { setToken, token } = useToken();

  if (!token) {
    return (
      <Fragment>

        <HeaderBar />
        <Suspense fallback={<div className="center"><CircularProgress /></div>}>
          <Switch>
            <Route path='/' exact>
              <Login setToken={setToken} token={token} />
            </Route>

            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Suspense>

      </Fragment>

    );
  };

  const user_role = tokenDecoder(token).role;

  if (user_role === 'CUSTOMER') {
    return (
      <Fragment>
        <Suspense fallback={<div className="center"><CircularProgress /></div>}>
          <Switch>
          <Route path='/home' exact>
              <Dashboard token={token} setToken={setToken} />
            </Route>
            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>          
            <Route path='/search' exact>
              <Dashboard token={token} setToken={setToken} />
            </Route>
            <Route path='/mybookings' exact>
              <Dashboard token={token} setToken={setToken} />
            </Route>
            <Route path='/myaccount' exact>
              <Dashboard token={token} setToken={setToken} />
            </Route>
            <Route path='*'>
              <Redirect to='/home' />
            </Route>
          </Switch>
        </Suspense>
      </Fragment>


    )

  }

  if (user_role === 'ADMIN') {
    return (
      <Fragment>
        <Suspense fallback={<div className="center"><CircularProgress /></div>}>
          <Switch>
            <Route path='/home' exact>
              <AdminDashboard token={token} setToken={setToken} />
            </Route>

            <Route path='/viewusers' exact>
              <AdminDashboard token={token} setToken={setToken} />
            </Route>

            <Route path='/search' exact>
              <AdminDashboard token={token} setToken={setToken} />
            </Route>

            <Route path='*'>
              <Redirect to='/home' />
            </Route>

          </Switch>

        </Suspense></Fragment>


    )
  }


}

export default App;
