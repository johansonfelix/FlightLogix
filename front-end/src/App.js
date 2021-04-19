import './App.css';
import Login from './Pages/Login';
import HeaderBar from './Components/HeaderBar';
import Dashboard from './Components/Dashboard/Dashbord';
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
           <Redirect to='/login'/>
          </Route>
        </Switch>

      </Fragment>



    );
  };


  return <Dashboard token={token} setToken={setToken}/>





}

export default App;
