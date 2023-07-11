import React, { useEffect, useMemo } from 'react';
import { useAuth } from '../../utils/auth';
import Table from '../Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest, usersSelector } from '../../redux/userRedux';

import { booksSelector, fetchBooksRequest } from '../../redux/bookRedux';

export const RENTED_BOOKS_TABLE_CONFIGS = [
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
];

export const PROFILE_SUMMARY_TABLE_CONFIGS = [
  {
    header: 'Name',
    attribute: 'name',
  },
  {
    header: 'Email',
    attribute: 'email',
  },
  {
    header: 'Date Joined',
    attribute: 'doj',
  },
  {
    header: 'Books Rented At Present',
    attribute: 'booksRentedNow',
  },
];

export const profileTableMessages = { heading: 'Profile Summary', noRecords: '' };

export const rentedBooksTableMessages = {
  heading: 'Rented By You',
  noRecords: 'No Books Rented At Present',
};

const Profile = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const { data: user } = useSelector(usersSelector.getCurrentUser);
  const bookList = useSelector(booksSelector.getBooks);

  const rentedBooksByUser = useMemo(() => {
    return user?.books?.map((bookId) =>
      bookList.find((book) => book?.id === bookId)
    );
  }, [bookList, user]);

  const profile = useMemo(() => {
    const arr = [];
    const { password, ...withoutPassword } = user;
    arr.push({
      ...withoutPassword,
      booksRentedNow: user?.books?.length,
    });
    return arr;
  }, [user]);

  useEffect(() => {
    dispatch(fetchUserRequest(auth.user.id));
    dispatch(fetchBooksRequest());
  }, []);

  return (
    <>
      <Table
        data-testid='profile-summary-table'
        list={profile}
        messages={profileTableMessages}
        configs={PROFILE_SUMMARY_TABLE_CONFIGS}
      />
      <Table
        data-testid='rented-books-table'
        list={rentedBooksByUser}
        messages={rentedBooksTableMessages}
        configs={RENTED_BOOKS_TABLE_CONFIGS}
      />
    </>
  );
};

export default Profile;
