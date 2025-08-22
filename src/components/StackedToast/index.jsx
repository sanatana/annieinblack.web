import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from '@tdaniil/react-draggable';
import PropTypes from 'prop-types';
import { stackedToasts as stackedToastsConfig } from '../../config';

import './stacked_toast.scss';

const REMOVE_AFTER_CSS_ANIMATION_SECONDS = 1;
const hideTimer = null;
const stackedToastTimeOuts = {};

const useDrag = true;

import notification from '../../assets/sounds/notification.mp3';

const audio = new Audio(notification);

const playSound = async () => {
  try {
    audio.volume = 0.10;
    audio.currentTime = 0;
    await audio.play().catch(() => null);
  } catch (e) {
    // error due to user not interacting with document yet
  }
};

const Toast = ({ message, handleHideToast, startHidingToast }) => {
  const ref = useRef();
  const draggableRef = useRef();

  if (!useDrag) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        onClick={ () => {
          if (message.startHide) {
            return;
          }
          startHidingToast(message.id);
        } }
      >
        <div
          ref={ ref }
          className={
            `stacked-toaster__message stacked-toaster__message--${message.type}
            ${(message?.startHide || null) && 'stacked-toaster__message--start-hide'}`
          }
        >
          <div className="stacked-toaster__message--text"
            dangerouslySetInnerHTML={{ __html: message.message }}
          />
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={ () => {
        if (message.startHide) {
          return;
        }
        startHidingToast(message.id);
      } }
    >
      <Draggable
        ref={ draggableRef }
        axis="x"
        onStop={ () => {
          handleHideToast(message.id);
        } }
        nodeRef={ ref }
      >
        <div
          ref={ ref }
          className={
            `stacked-toaster__message stacked-toaster__message--${message.type}
            ${(message?.startHide || null) && 'stacked-toaster__message--start-hide'}`
          }
        >
          <div className="stacked-toaster__message--text"
            dangerouslySetInnerHTML={{ __html: message.message }}
          />

        </div>
      </Draggable>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startHide: PropTypes.bool,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  handleHideToast: PropTypes.func.isRequired,
  startHidingToast: PropTypes.func.isRequired,
};

const StackedToast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.utils.stackedToast);

  const [messages, setMessage] = useState([]);

  const handleHideToast = useCallback((id) => {
    setMessage((prevState) => {
      const updatedMessages = [...prevState].filter((currentMessage) => {
        if (currentMessage.id === id) {
          clearTimeout(stackedToastTimeOuts[currentMessage.id]);
          return false;
        }
        return true;
      });
      return updatedMessages;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const startHidingToast = useCallback((id) => {
    setMessage((prevState) => {
      const updatedMessages = [...prevState].map((currentMessage) => {
        const temp = currentMessage;
        if (currentMessage.id === id) {
          temp.startHide = true;
          setTimeout(() => {
            handleHideToast(temp.id);
          }, REMOVE_AFTER_CSS_ANIMATION_SECONDS * 1000);
        }

        return temp;
      });
      return updatedMessages;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCountDown = useCallback((id) => {
    clearTimeout(stackedToastTimeOuts[id] || null);

    stackedToastTimeOuts[id] = setTimeout(() => {
      startHidingToast(id);
    }, stackedToastsConfig.DURATION_OF_SHOWTIME_SECONDS * 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (toast?.show) {
      const temp = { ...toast };
      const date = new Date();
      temp.id = date.getTime();
      temp.date = date;

      if (document?.visibilityState === 'visible') {
        playSound();
      }

      setMessage((prevState) => {
        const updatedValues = [temp, ...prevState];
        if (updatedValues.length > stackedToastsConfig.MAX_STACKED_MESSAGES) {

          updatedValues.map((currentMessage, index) => {
            if (index >= stackedToastsConfig.MAX_STACKED_MESSAGES) {
              startHidingToast(currentMessage.id);
            }
          });
        }

        return updatedValues;
      });
      startCountDown(temp.id);
    }

    return () => {
      clearTimeout(hideTimer);
    };
  }, [dispatch, startCountDown, startHidingToast, toast]);

  if (messages.length === 0) {
    // return null;
  }

  return (
    <div className="stacked-toaster">
      {
        messages.map((message) => (
          <Toast
            key={ `stacked-toast-${message.id}` }
            message={ message }
            handleHideToast={ handleHideToast }
            startHidingToast={ startHidingToast }
          />
        ))
      }
    </div>
  );
};

export default StackedToast;
