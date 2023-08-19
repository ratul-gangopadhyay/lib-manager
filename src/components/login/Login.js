import React, { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { useAuth } from '../../utils/auth';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import './login.css';
import { Button, TextField } from '@mui/material';
import { loginTextFieldStyles } from '../../constants/muiStyles';
import { hyperLinkStyles } from '../../constants/inlineStyles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest, usersSelector } from '../../redux/userRedux';
import { errorToast } from '../../utils/toastUtils';
import { registrationMessages } from '../../constants/messages';
import { allFieldsPopulated } from '../../utils/utility';

const DEFAULT_CREDS = {
  id: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [user, setUser] = useState(DEFAULT_CREDS);
  const usersInDB = useSelector(usersSelector.getUsers);

  const redirectPath = location.state?.path || '/';

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleChange = ({ target: { value, name } }) =>
    setUser((user) => ({
      ...user,
      [name]: value,
    }));

  const handleLogin = (event) => {
    event.preventDefault();
    const userInDB = usersInDB.find(({ id }) => id === user.id);
    if (userInDB) {
      if (bcrypt.compareSync(user.password, userInDB.password)) {
        auth.login(user);
        navigate(redirectPath, { replace: true });
      } else {
        errorToast(registrationMessages.wrongAttempt);
      }
    } else {
      errorToast(registrationMessages.wrongAttempt);
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin}>
        <div className='login'>
          <h1>Sign In</h1>
          <TextField
            sx={loginTextFieldStyles}
            label='Username'
            name='id'
            onChange={handleChange}
            value={user.id}
          />
          <TextField
            sx={loginTextFieldStyles}
            label='Password'
            type='password'
            name='password'
            onChange={handleChange}
            value={user.password}
          />
          <span>
            <Button
              type='submit'
              variant='contained'
              sx={{
                backgroundColor: 'rgb(5, 29, 55)',
                borderColor: '#fff',
                color: '#fff',
                width: '6rem',
                '&:disabled': {
                  backgroundColor: '#848b94',
                  borderColor: '#848b94',
                  color: '#ccc',
                },
              }}
              disabled={!allFieldsPopulated(user)}
              size='small'
              endIcon={<LoginIcon />}
            >
              Sign In
            </Button>
            &nbsp;&nbsp;
            <Link to='/register' style={hyperLinkStyles}>
              Need an account?
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
