import React, { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { errorToast } from '../../utils/toastUtils';
import TextField from '@mui/material/TextField';
import './register.css';
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginTextFieldStyles } from '../../constants/muiStyles';
import {
  errorSpan,
  hyperLinkStyles,
  infoSpan,
  successSpan,
} from '../../constants/inlineStyles';
import { registrationMessages } from '../../constants/messages';
import { allFieldsPopulated } from '../../utils/utility';
import { useDebounce } from '../../hooks/useDebounce';
import { validateEmail } from '../../utils/regexUtils';
import {
  addUserRequest,
  fetchUsersRequest,
  usersSelector,
} from '../../redux/userRedux';
import { useDispatch, useSelector } from 'react-redux';
import { alreadyPresent } from './registrationUtils';
import moment from 'moment/moment';

const DEFAULT_ERROR = {
  userAlready: false,
  wrongUser: false,
  wrongPassword: false,
  notMatching: false,
  invalidEmail: false,
  emailAlready: false,
};

const DEFAULT_USER = {
  id: '',
  name: '',
  email: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(DEFAULT_USER);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(DEFAULT_ERROR);

  const debouncedEmailEntry = useDebounce(user.email, 1100);
  const usersInDB = useSelector(usersSelector.getUsers);
  const adding = useSelector(usersSelector.getUsers)?.loading;
  const errorWhileAdding = useSelector(usersSelector.getUsers)?.error;

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  useEffect(() => {
    if (debouncedEmailEntry) {
      setError((error) => ({
        ...error,
        invalidEmail: !validateEmail(debouncedEmailEntry),
        emailAlready: alreadyPresent(debouncedEmailEntry, usersInDB),
      }));
    }
  }, [debouncedEmailEntry]);

  const handleChange = ({ target: { value, name } }) => {
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = ({ target: { value } }) => {
    setConfirmPassword(value);
    setError((error) => ({ ...error, notMatching: value !== password }));
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
    setError((error) => ({ ...error, notMatching: value !== confirmPassword }));
  };

  const changeHelperText = () => {
    const { invalidEmail, emailAlready } = error;
    if (invalidEmail) {
      return registrationMessages.invalidEmail;
    } else {
      if (emailAlready) {
        return registrationMessages.emailAlready;
      }
    }
    return '';
  };

  const submit = (event) => {
    event.preventDefault();
    if (usersInDB.find(({ id }) => user.id === id)) {
      errorToast(registrationMessages.userAlready);
    } else {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
      const userPayload = {
        ...user,
        password: hashedPassword,
        booksRentedNow: 0,
        books: [],
        doj: moment().format('YYYY-MM-DD'),
      };
      dispatch(addUserRequest(userPayload));
      do {
        if (errorWhileAdding) {
          return;
        }
      } while (adding);
      navigate('/login');
    }
  };

  return (
    <div className='register-container'>
      <form onSubmit={submit}>
        <div className='register'>
          <h1>Register</h1>
          <Box
            component='form'
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
          >
            <TextField
              sx={loginTextFieldStyles}
              required
              name='name'
              value={user.name}
              id='outlined-required'
              label='Name'
              onChange={handleChange}
            />
            <TextField
              sx={loginTextFieldStyles}
              name='email'
              value={user.email}
              required
              id='outlined-required'
              label='Email'
              error={error.invalidEmail || error.emailAlready}
              helperText={changeHelperText()}
              onChange={handleChange}
            />
          </Box>
          <Box
            component='form'
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
          >
            <TextField
              sx={loginTextFieldStyles}
              required
              name='id'
              value={user.id}
              label='Username'
              onChange={handleChange}
            />
            <TextField
              sx={loginTextFieldStyles}
              name='password'
              value={password}
              onChange={handlePasswordChange}
              label='Password'
              type='password'
            />
            <TextField
              sx={loginTextFieldStyles}
              label='Confirm Password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type='password'
            />
          </Box>
          {confirmPassword && password ? (
            error.notMatching ? (
              <span style={errorSpan}>{registrationMessages.notMatching}</span>
            ) : (
              <span style={successSpan}>{registrationMessages.matching}</span>
            )
          ) : null}
          {error.userAlready && (
            <span style={infoSpan}>{registrationMessages.userAlready}</span>
          )}
          <div>
            <Button
              type='submit'
              variant='contained'
              sx={{
                backgroundColor: 'rgb(5, 29, 55)',
                borderColor: '#fff',
                color: '#fff',
                width: '15rem',
                '&:disabled': {
                  backgroundColor: '#848b94',
                  borderColor: '#848b94',
                  color: '#ccc',
                },
              }}
              size='small'
              disabled={
                !allFieldsPopulated(user) ||
                error.notMatching ||
                !password ||
                !confirmPassword ||
                error.invalidEmail ||
                error.emailAlready
              }
            >
              Create my account
            </Button>
          </div>
          <Link to='/login' style={hyperLinkStyles}>
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
