import { useAuth } from '../context/authContext';

const useErrorHandle = () => {
  const { logout } = useAuth();

  const handleError = (error: Error) => {
    if (error.message === 'Authentication Fail') {
      logout();
    }
  };

  return handleError;
};

export default useErrorHandle;
