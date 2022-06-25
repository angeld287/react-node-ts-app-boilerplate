import React, { useEffect, useMemo, useState } from 'react';
import userService from './apis/userService';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectUserSession, setSession } from './features/userSession/userSessionSlice';
import IUserService from './interfaces/IUserService';
import Routes from './Routes';
import Login from './screens/Login';

function App() {
  const _userService: IUserService = useMemo(() => new userService(), []);
  const session = useAppSelector(selectUserSession);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchSession = async () => {
      setLoading(true);
      const response = await _userService.getSession();

      if (!didCancel) {
        dispatch(setSession(response.data.session !== null));
        setLoading(false);
      }
    }

    fetchSession();

    return () => {
      setLoading(false);
      didCancel = true;
    }
  }, [_userService, dispatch]);

  if (loading) return <h1>Cargando...</h1>
  if (!session.activeSession) return <Login />

  return <Routes />;
}

export default App;
