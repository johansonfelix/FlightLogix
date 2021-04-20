import { useState } from 'react';

export default function useToken() {

  function getToken() {
    return localStorage.getItem('token');
  };

  const [token, setToken] = useState(getToken());

   const saveToken = userToken => {
    console.log("CALLED")
    localStorage.setItem('token', userToken);
    setToken(userToken); 
  };

  return {
    
    setToken : saveToken, 
      token
    
  }
};  

