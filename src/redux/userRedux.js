import { addNewUser, getAllUsers, getUser, patchUser } from '../apis/usersApis';
import { registrationMessages } from '../constants/messages';
import { errorToast, successToast } from '../utils/toastUtils';
import { patchBookRequest } from './bookRedux';

export const actions = {
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE: 'FETCH_USERS_FAILURE',
  ADD_USER: 'ADD_USER',
  ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
  ADD_USER_FAILURE: 'ADD_USER_FAILURE',
  FETCH_USER: 'FETCH_USER',
  FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',
  RESET_USER: 'RESET_USER',
  PATCH_USER: 'PATCH_USER',
  PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS',
  PATCH_USER_FAILURE: 'PATCH_USER_FAILURE',
  RENT_BOOK: 'RENT_BOOK',
  RENT_BOOK_SUCCESS: 'RENT_BOOK_SUCCESS',
  RENT_BOOK_FAILURE: 'RENT_BOOK_FAILURE',
};

export const fetchUsers = () => ({
  type: actions.FETCH_USERS,
});

export const fetchUsersSuccess = (users) => ({
  type: actions.FETCH_USERS_SUCCESS,
  payload: { users },
});

export const fetchUsersFailure = (error) => ({
  type: actions.FETCH_USERS_FAILURE,
  payload: { error },
});

export const fetchUser = () => ({
  type: actions.FETCH_USER,
});

export const fetchUserSuccess = (user) => ({
  type: actions.FETCH_USER_SUCCESS,
  payload: { user },
});

export const fetchUserFailure = (error) => ({
  type: actions.FETCH_USER_FAILURE,
  payload: { error },
});

export const addUser = () => ({
  type: actions.ADD_USER,
});

export const addUserSuccess = (user) => ({
  type: actions.ADD_USER_SUCCESS,
  payload: { user },
});

export const addUserFailure = (error) => ({
  type: actions.ADD_USER_FAILURE,
  payload: { error },
});

export const rentBook = () => ({
  type: actions.RENT_BOOK,
});

export const rentBookSuccess = (user) => ({
  type: actions.RENT_BOOK_SUCCESS,
  payload: { user },
});

export const rentBookFailure = (error) => ({
  type: actions.RENT_BOOK_FAILURE,
  payload: { error },
});

const initialState = {
  users: [],
  loading: false,
  error: '',
  user: {
    data: {},
    loading: false,
    error: '',
  },
};

const modifyUsersById = (users, updatedUser) =>
  users.map((user) => (user.id === updatedUser.id ? updatedUser : user));

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.FETCH_USERS:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload.users,
      };
    case actions.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case actions.ADD_USER:
      return {
        ...state,
        loading: true,
      };
    case actions.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, payload.user],
      };
    case actions.ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case actions.FETCH_USER:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case actions.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          data: payload.user,
        },
      };
    case actions.FETCH_USER_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: payload.error,
        },
      };
    case actions.RESET_USER:
      return {
        ...state,
        user: {
          loading: false,
          data: {},
          error: '',
        },
      };
    case actions.RENT_BOOK:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case actions.RENT_BOOK_SUCCESS:
      return {
        ...state,
        users: modifyUsersById(state.users, payload.user),
        user: {
          ...state.user,
          loading: false,
          data: payload.user,
        },
      };
    case actions.RENT_BOOK_FAILURE:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: payload.error,
        },
      };
    default:
      return state;
  }
};

export const fetchUsersRequest = () => (dispatch) => {
  dispatch(fetchUsers());
  getAllUsers()
    .then((response) => dispatch(fetchUsersSuccess(response.data)))
    .catch((error) => dispatch(fetchUsersFailure(error.message)));
};

export const fetchUserRequest = (id) => (dispatch) => {
  dispatch(fetchUser());
  getUser(id)
    .then((response) => dispatch(fetchUserSuccess(response.data)))
    .catch((error) => dispatch(fetchUserFailure(error.message)));
};

export const addUserRequest = (newUser) => (dispatch) => {
  dispatch(addUser());
  addNewUser(newUser)
    .then((response) => {
      dispatch(addUserSuccess(response.data));
      successToast(registrationMessages.success);
    })
    .catch((error) => dispatch(addUserFailure(error)));
};

export const rentBookRequest =
  (userId, newCount, bookId, updatedBooks) => (dispatch) => {
    dispatch(rentBook());
    const patchPayload = {
      booksRentedNow: updatedBooks.length,
      books: updatedBooks,
    };
    patchUser(userId, patchPayload)
      .then((response) => {
        dispatch(patchBookRequest(bookId, newCount));
        dispatch(rentBookSuccess(response.data));
        successToast('Rent Successful');
      })
      .catch((error) => {
        dispatch(rentBookFailure(error));
        errorToast('Some issue while renting :(');
      });
  };

export const usersSelector = {
  getUsers: (state) => state?.users?.users || [],
  getUser: (state, id) => state?.users?.users?.find((user) => user.id === id),
  getCurrentUser: (state) => state?.users?.user,
};
