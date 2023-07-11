import { shallow } from 'enzyme';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/auth';
import { ToastContainer } from 'react-toastify';
import AppNavbar from './components/navbar/AppNavbar';
import AppRouter from './AppRouter';

describe('App Tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders AuthProvider, BrowserRouter, ToastContainer, AppNavbar, and AppRouter', () => {
    expect(wrapper.find(AuthProvider).length).toEqual(1);
    expect(wrapper.find(BrowserRouter).length).toEqual(1);
    expect(wrapper.find(ToastContainer).length).toEqual(1);
    expect(wrapper.find(AppNavbar).length).toEqual(1);
    expect(wrapper.find(AppRouter).length).toEqual(1);
  });

});
