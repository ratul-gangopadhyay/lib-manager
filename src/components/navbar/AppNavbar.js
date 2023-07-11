import React, { useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from '../styled/Nav';
import './navbar.css';
import { useAuth } from '../../utils/auth';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions,
  usersSelector,
} from '../../redux/userRedux';
import { buttonStyles } from '../../constants/muiStyles';

const AppNavbar = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) =>
    usersSelector.getUser(state, auth.user?.id)
  );

  const firstName = useMemo(
    () => loggedInUser?.name?.split(' ')[0],
    [loggedInUser]
  );

  const handleLogout = () => {
    dispatch({ type: actions.RESET_USER });
    auth.logout();
    navigate(location.pathname);
  };

  return (
    <Nav>
      <div className='nav-items-from-left'>
        <NavLink activeClassName='active' className='nav-items' to='/'>
          Books
        </NavLink>
        <NavLink activeClassName='active' className='nav-items' to='/profile'>
          Your Profile
        </NavLink>
        {!auth.user && (
          <NavLink
            activeClassName='active'
            className='nav-items'
            to='/register'
          >
            Register
          </NavLink>
        )}
      </div>
      <div className='nav-items-from-right'>
        {auth.user && <h4 className='welcome-user'>Hello {firstName} !</h4>}
        {!auth.user ? (
          <Button
            sx={buttonStyles}
            size='small'
            variant='contained'
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
        ) : (
          <Button
            sx={buttonStyles}
            size='small'
            variant='contained'
            onClick={handleLogout}
          >
            Log out
          </Button>
        )}
      </div>
    </Nav>
  );
};

export default AppNavbar;
