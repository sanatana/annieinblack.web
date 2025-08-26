import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomStorage from '@src/helpers/storage';

const customStorageLocal = new CustomStorage();
const customStorageSession = new CustomStorage('session');

const PrivacyNoTracking = () => {
  const navigate = useNavigate();

  useEffect(() => {
    customStorageLocal.remove('annie-in-black__no-track', true);
    customStorageSession.remove('annie-in-black__no-track', true);

    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default PrivacyNoTracking;
