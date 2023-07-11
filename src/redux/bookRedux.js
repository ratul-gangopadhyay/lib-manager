import { getAllBooks, patchBook } from '../apis/booksApis';

export const actions = {
  FETCH_BOOKS: 'FETCH_BOOKS',
  FETCH_BOOKS_SUCCESS: 'FETCH_BOOKS_SUCCESS',
  FETCH_BOOKS_FAILURE: 'FETCH_BOOKS_FAILURE',
  PATCH_BOOK: 'PATCH_BOOK',
  PATCH_BOOK_SUCCESS: 'PATCH_BOOK_SUCCESS',
  PATCH_BOOK_FAILURE: 'PATCH_BOOK_FAILURE',
};

export const fetchBooks = () => ({
  type: actions.FETCH_BOOKS,
});

export const fetchBooksSuccess = (books) => ({
  type: actions.FETCH_BOOKS_SUCCESS,
  payload: { books },
});

export const fetchBooksFailure = (error) => ({
  type: actions.FETCH_BOOKS_FAILURE,
  payload: { error },
});

export const patchBookStart = () => ({
  type: actions.PATCH_BOOK,
});

export const patchBookSuccess = (book) => ({
  type: actions.PATCH_BOOK_SUCCESS,
  payload: { book },
});

export const patchBookFailure = (error) => ({
  type: actions.PATCH_BOOK_FAILURE,
  payload: { error },
});

const initialState = {
  books: [],
  loading: false,
  error: '',
};

const modifyBooksById = (books, updatedBook) =>
  books.map((book) => (book.id === updatedBook.id ? updatedBook : book));

export const bookReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.FETCH_BOOKS:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: payload.books,
      };
    case actions.FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    case actions.PATCH_BOOK:
      return {
        ...state,
        loading: true,
      };
    case actions.PATCH_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: modifyBooksById(state.books, payload.book),
      };
    case actions.PATCH_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export const fetchBooksRequest = () => (dispatch) => {
  dispatch(fetchBooks());
  getAllBooks()
    .then((response) => dispatch(fetchBooksSuccess(response.data)))
    .catch((error) => dispatch(fetchBooksFailure(error.message)));
};

export const patchBookRequest = (bookId, newCount) => (dispatch) => {
  dispatch(patchBookStart());
  patchBook(bookId, { copies: newCount })
    .then((response) => dispatch(patchBookSuccess(response.data)))
    .catch((error) => dispatch(patchBookFailure(error.message)));
};

export const booksSelector = {
  getBooks: (state) => state?.books?.books || [],
};
