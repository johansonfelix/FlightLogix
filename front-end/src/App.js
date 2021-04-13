import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Flights from './pages/Flights';
import Book from './pages/Book';
import Confirm from './pages/Confirmation';
import Success from './pages/Success';
import Bookings from './pages/Bookings';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>

        <Route path='/home'>
          <Home />
        </Route>

        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/register'>
          <Register />
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

        </Route>
      </Switch>
    </Layout>

  );
}

export default App;
