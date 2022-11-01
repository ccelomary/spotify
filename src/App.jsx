import { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { setTokenService } from './services/token.service';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import './App.css'
function App({token, setTokenService}) {
  const location = useLocation();

  useEffect(()=> {
    if (!token) // prevent doing heavy work if token is already set
    {
      const ret = location.hash.split('&').map((element, index) => index == 0 ? element.slice(1): element);
      ret.map(element => element.split('=')).forEach(element => {
        if (element[0] === 'access_token') {
          setTokenService(element[1]);
        }
      })
    }
  }, []);
  return token ? <Dashboard /> : <Login />
}

export default connect((state)=>{
  return {
    token: state.token
  }
}, {
  setTokenService
})(App);
