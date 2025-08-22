import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideModal } from '@src/redux/slices/utils/actions';

const useCloseModalOnNavigate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const persist = useSelector((state) => state.utils.modal?.data?.persist);

  useEffect(() => {
    if (persist) {
      return;
    }

    dispatch(hideModal());
  }, [navigate, dispatch, persist]);

  return null;
};

export default useCloseModalOnNavigate;
