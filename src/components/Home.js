import React, { useEffect, useMemo } from 'react';
import Table from './Table/Table';
import { useAuth } from '../utils/auth';
import RentNowButton from './shared/Buttons/RentNowButton';
import { useDispatch, useSelector } from 'react-redux';
import { booksSelector, fetchBooksRequest } from '../redux/bookRedux';
import {
  fetchUsersRequest,
  rentBookRequest,
  usersSelector,
} from '../redux/userRedux';

const TABLE_CONFIGS = [
  {
    header: 'Book',
    attribute: 'title',
  },
  {
    header: 'Genre',
    attribute: 'genre',
  },
  {
    header: 'Author',
    attribute: 'author',
  },
  {
    header: 'Rating',
    attribute: 'rating',
  },
  {
    header: 'Price',
    attribute: 'price',
  },
  {
    header: 'Copies Available',
    attribute: 'copies',
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector(booksSelector.getBooks);
  const users = useSelector(usersSelector.getUsers);
  const auth = useAuth();

  useEffect(() => {
    dispatch(fetchUsersRequest());
    dispatch(fetchBooksRequest());
  }, [dispatch]);

  const handleRent = (item) => {
    const bookSelected = books?.find((book) => book.id === item.id);
    const user = users?.find((user) => user.id === auth.user.id);
    const { id: bookId } = bookSelected;
    let { copies } = bookSelected;
    const { books: previousBooks } = user;
    const updatedBooks = [...previousBooks, bookId];
    dispatch(rentBookRequest(auth.user.id, --copies, bookId, updatedBooks));
  };

  const booksRentedByUser = useMemo(
    () => users?.find((user) => user.id === auth?.user?.id)?.books,
    [users, auth]
  );

  const showRentNow = (user) => ({
    header: 'Rent',
    attribute: RentNowButton,
    element: {
      props: {
        user,
        booksRented: booksRentedByUser,
        runOnClick: handleRent,
      },
    },
  });

  const newConfigs = useMemo(() => {
    if (auth?.user) {
      return [...TABLE_CONFIGS, showRentNow(auth?.user)];
    }
    return TABLE_CONFIGS;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, users, showRentNow]);

  return (
    <Table
      list={books}
      messages={{ heading: 'Books Available', noRecords: 'No Books Found' }}
      configs={newConfigs}
    />
  );
};

export default Home;
