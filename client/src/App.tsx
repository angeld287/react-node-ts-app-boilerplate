import React, { useEffect, useMemo, useState } from 'react';
import userService from './apis/userService';
import './App.css';
import IUserService from './interfaces/IUserService';
import Routes from './Routes';
import Login from './screens/Login';

function App() {
  const _userService: IUserService = useMemo(() => new userService(), []);

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState();

  useEffect(() => {
    let didCancel = false;

    const fetchSession = async () => {
      setLoading(true);
      const response = await _userService.getSession();

      if (!didCancel) {
        setSession(response.data.session);
        setLoading(false);
      }
    }

    fetchSession();

    return () => {
      setLoading(false);
      didCancel = true;
    }
  }, [_userService]);

  if (loading) return <h1>Cargando...</h1>
  if (session === null) return <Login />

  return <Routes />;
}

export default App;
