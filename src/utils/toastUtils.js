import { toast } from 'react-toastify';

const dark = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export const errorToast = (message) => toast.error(message, dark);

export const successToast = (message) => toast.success(message, dark);
