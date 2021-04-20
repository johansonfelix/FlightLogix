import './App.css';
import Login from './Pages/Login';
import HeaderBar from './Components/HeaderBar';
import Dashboard from './Components/Dashboard/Dashboard';
import useToken from './Hooks/useToken';
import { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {

  const { setToken, token } = useToken();
  console.log("......." + token)

  if (!token) {
    return (
      <Fragment>

        <HeaderBar />
        <Switch>
          <Route path='/login' exact>
            <Login setToken={setToken} token={token} />
          </Route>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
        </Switch>
        <Route path='*'>
         <Redirect to='/login' />
      </Route>


      </Fragment>



    );
  };


  return (
    <Switch>
       <Route path='/login' exact>
       <Redirect to='/home' />
    </Route>
      <Route path='/home' exact>
        <Dashboard token={token} setToken={setToken} />)
    </Route>
      <Route path='/search' exact>
        <Dashboard token={token} setToken={setToken} />)
    </Route>
    <Route path='*' exact>
       <Redirect to='/home' />
    </Route>
    


    </Switch>


  )



}

export default App;
