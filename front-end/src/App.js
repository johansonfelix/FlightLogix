import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Flights from './pages/Flights';
import Book from './pages/Book';
import Confirm from './pages/Confirmation';
import Success from './pages/Success';
import Bookings from './pages/Bookings';
import Layout from './components/Layout/Layout';
import { Fragment } from 'react';
import useToken from './lib/hooks/useToken';




function App() {

  const { setToken, token } = useToken();

  if (!token) {
    return (
      <Fragment>
        <Switch>
          <Route path='/login' exact>
            <Login setToken={setToken} />
          </Route>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>

          <Route path='*'>
            <Redirect to ='/login'/>
                    {/* Page not found page */}
          </Route>
        </Switch>
      </Fragment>
    );
  };


  return (


    <Fragment>


      <Layout>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>

          <Route path='/home'>
            <Dashboard />
          </Route>


          <Route path='/search'>
            <Redirect to='/home' />
          </Route>

          <Route path='/flights'>
            <Flights />
          </Route>

          <Route path='/book'>
            <Book />
          </Route>

          <Route path='/confirm'>
            <Confirm />
          </Route>

          <Route path='/success'>
            <Success />
          </Route>

          <Route path='/bookings'>
            <Bookings />
          </Route>

          <Route path='*'>
        {/* Page not found page */}
          </Route>
        </Switch>
      </Layout>
    </Fragment>
  );
};

export default App;
