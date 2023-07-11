import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/login/Login';
import RequireAuth from './components/RequireAuth';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route
        path='/profile'
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path='/login' Component={Login} />
      <Route path='/register' Component={Register} />
    </Routes>
  );
};

export default AppRouter;
