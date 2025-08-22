import { useEffect } from 'react';

import { keyboard } from '@src/config';

const useEscAction = (close) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.which === keyboard.KEYS.ESCAPE && typeof close === 'function') {
        close();
      }
    };

    window.removeEventListener('keyup', handleKeyDown);
    window.addEventListener('keyup', handleKeyDown);

    return () => {
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, [close]);

  return null;
};

export default useEscAction;
