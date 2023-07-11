import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import AppNavbar from './components/navbar/AppNavbar';
import { AuthProvider } from './utils/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <AppNavbar />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
