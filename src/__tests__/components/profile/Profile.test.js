import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../../redux/index';
import Profile, { PROFILE_SUMMARY_TABLE_CONFIGS, RENTED_BOOKS_TABLE_CONFIGS, profileTableMessages, rentedBooksTableMessages } from '../../../components/profile/Profile';
import Table from '../../../components/Table/Table';

jest.mock('../../../utils/auth', () => ({
  useAuth: () => ({
    user: {
      id: 'dummyUserId',
    },
  }),
}));

describe('<Profile/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });
  
  it('should render two Tables', () => {
    expect(wrapper.find(Table).length).toEqual(2);
  });

  it('should render the profile summary table', () => {
    expect(wrapper.find('[data-testid="profile-summary-table"]').exists()).toBe(
      true
    );
  });

  it('should render the rented books table', () => {
    expect(wrapper.find('[data-testid="rented-books-table"]').exists()).toBe(
      true
    );
  });

  it('should pass proper configs and messages to Profile Table', () => {
    expect(wrapper.find('[data-testid="profile-summary-table"]').prop('configs')).toEqual(PROFILE_SUMMARY_TABLE_CONFIGS);
    expect(wrapper.find('[data-testid="profile-summary-table"]').prop('messages')).toEqual(profileTableMessages);
  })
  
  it('should pass proper configs and messages to Rent Table', () => {
    expect(wrapper.find('[data-testid="rented-books-table"]').prop('configs')).toEqual(RENTED_BOOKS_TABLE_CONFIGS);
    expect(wrapper.find('[data-testid="rented-books-table"]').prop('messages')).toEqual(rentedBooksTableMessages);
  })
});
