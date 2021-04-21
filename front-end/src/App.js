import './App.css';
import Login from './Pages/Login';
import HeaderBar from './Components/HeaderBar';
import Dashboard from './Components/UserDashboard/Dashboard';
import useToken from './Hooks/useToken';
import { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import MyBookings from './Pages/MyBookings';
import {tokenDecoder} from './Utils/httpRequestMaker';
import AdminDashboard from './Components/AdminDashboard/Dashboard';

function App() {
  let history = useHistory();
  
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

  const user_role = tokenDecoder(token).role;

if(user_role === 'CUSTOMER'){
  return (
    <Switch>
       <Route path='/login' exact>
       <Redirect to='/home' />
    </Route>
      <Route path='/home' exact>
        <Dashboard token={token} setToken={setToken} />
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
    <Route path='*' exact>
       <Redirect to='/home' />
    </Route>
        </Switch>


  )

}

if(user_role === 'ADMIN'){
  return(
    <Switch>
    <Route path='/login' exact>
    <Redirect to='/home' />
 </Route>
   <Route path='/home' exact>
     <AdminDashboard token={token} setToken={setToken} />
 </Route>
   <Route path='/search' exact>
     <Dashboard token={token} setToken={setToken} />
 </Route>
 <Route path='/mybookings' exact>
   <Dashboard token={token} setToken={setToken} />
 </Route>
 <Route path='*' exact>
    <Redirect to='/home' />
 </Route>
     </Switch>


  )
}



}

export default App;
