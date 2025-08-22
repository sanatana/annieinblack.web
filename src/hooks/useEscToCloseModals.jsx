import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { keyboard } from '@src/config';
import { hideModal } from '@src/redux/slices/utils/actions';

const useEscToCloseModals = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.which === keyboard.KEYS.ESCAPE) {
        dispatch(hideModal());
      }
    };

    window.removeEventListener('keyup', handleKeyDown);
    window.addEventListener('keyup', handleKeyDown);

    return () => {
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, [dispatch]);

  return null;
};

export default useEscToCloseModals;
