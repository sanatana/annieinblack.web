import { useEffect } from 'react';

const useBackButtonCloseModal = (close) => {
  useEffect(() => {
    const onPopState = () => {
      if (!window.location.hash) {
        close();
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [close]);
};

export default useBackButtonCloseModal;
