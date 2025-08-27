import setPageTitle from '@src/helpers/html/set_page_title';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useCallback } from 'react';
import { LoadingIndicator, Video } from '@src/components';
const SITE_KEY = process.env.REACT_APP_TURNSTILE_SITE_ID;
import { sendContactForm, setTempUtilValue } from '@src/redux/slices/utils/actions';
import { useDispatch, useSelector } from 'react-redux';

import './contact.scss';

const PageTitle = () => {

  useEffect(() => {
    setPageTitle('Contact us', 'Want to get in touch with us?', '/contact-us');
  }, []);

  return null;
};

const HomeHeader = () => {
  return (
    <section className="contact__hero">
      <Video />

      <div className="contact__hero-content">
        <h1 className="h1__title">Contact Us</h1>
        <h2>Want to get in touch with us?</h2>
      </div>
    </section>
  );
};

const loadTurnstile = () => {
  if (window.turnstile) { return Promise.resolve(); }
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    s.async = true;
    s.defer = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
};

const SubmitFormButton = () => {

  const { isContactFormSending } = useSelector((state) => state.utils.temp);

  if (isContactFormSending) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <button type="submit">
      Send
    </button>
  );
};

const PageForm = () => {
  const widgetContainerRef = useRef(null);
  const isRunningRef = useRef(false);
  const widgetIdRef = useRef(null);
  const execPromiseRef = useRef(null);
  const widgetContainerWrapperRef = useRef(null);
  const dispatch = useDispatch();

  const {
    setError,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm();

  const getTurnstileToken = useCallback(async () => {
    await loadTurnstile();

    // render widget once
    if (!widgetIdRef.current) {
      widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
        sitekey: SITE_KEY,
        execution: 'execute',
        size: 'flexible',
        theme: 'dark',
        callback: (t) => {
          setValue('cfToken', t, { shouldValidate: true });
          isRunningRef.current = false;
          if (execPromiseRef.current) {
            execPromiseRef.current.resolve(t);
            execPromiseRef.current = null;
          }
        },
        'error-callback': () => {
          setValue('cfToken', '', { shouldValidate: true });
          isRunningRef.current = false;
          if (execPromiseRef.current) {
            execPromiseRef.current.reject(new Error('Verification failed'));
            execPromiseRef.current = null;
          }
        },
        'expired-callback': () => {
          setValue('cfToken', '', { shouldValidate: true });
        },
      });
    }

    // if already executing, just wait
    if (isRunningRef.current && execPromiseRef.current) {
      return execPromiseRef.current.promise;
    }

    // otherwise start new execution
    isRunningRef.current = true;
    const pending = {};
    pending.promise = new Promise((resolve, reject) => {
      pending.resolve = resolve;
      pending.reject = reject;
    });
    execPromiseRef.current = pending;

    window.turnstile.reset(widgetIdRef.current);
    window.turnstile.execute(widgetIdRef.current);

    return pending.promise;
  }, [setValue]);

  const onSubmit = useCallback(async (data) => {
    clearErrors('cfToken');
    dispatch(setTempUtilValue('isContactFormSending', true));

    const wrapper = widgetContainerWrapperRef.current;
    wrapper.classList.add('form__cf-widget--open');

    let token = data.cfToken;

    if (!token) {
      try {
        token = await getTurnstileToken();
      } catch (err) {
        setError('cfToken', { type: 'manual', message: 'No security token received' });
        // eslint-disable-next-line no-console
        console.error(err);
        dispatch(setTempUtilValue('isContactFormSending', null));
        wrapper.classList.remove('form__cf-widget--open');
        return;
      }
    }

    if (!token || !token.trim()) {
      setError('cfToken', { type: 'manual', message: 'No security token received' });
      dispatch(setTempUtilValue('isContactFormSending', null));
      wrapper.classList.remove('form__cf-widget--open');
      return;
    }

    // all good: this is where you'd send to your backend
    wrapper.classList.remove('form__cf-widget--open');
    window.turnstile.reset(widgetIdRef.current);

    data.cfToken = token;
    const status = await dispatch(sendContactForm(data))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        return null;
      });

    if (status === 200) {
      dispatch(setTempUtilValue('isContactFormSent', new Date().toISOString()));
      dispatch(setTempUtilValue('isContactFormSending', null));
      reset();
    } else {
      dispatch(setTempUtilValue('isContactFormSending', null));
    }

  }, [clearErrors, dispatch, getTurnstileToken, reset, setError]);

  return (
    <article className="contact__content-2">
      <form noValidate onSubmit={ handleSubmit(onSubmit) }>
        { /* Name */ }
        <div className="form__input-wrapper">
          <label htmlFor="name">Name <em>(*)</em>:</label>
          <input
            id="name"
            { ...register('name', { required: 'Name is required' }) }
            type="text"
            placeholder="Your name"
            maxLength={ 50 }
          />
          { errors.name && <div className="form__input-error">{ errors.name.message }</div> }
        </div>

        { /* Email */ }
        <div className="form__input-wrapper">
          <label htmlFor="email">Email <em>(*)</em>:</label>
          <input
            id="email"
            { ...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
            }) }
            type="email"
            placeholder="you@example.com"
            maxLength={ 200 }
          />
          { errors.email && <div className="form__input-error">{ errors.email.message }</div> }
        </div>

        { /* Phone */ }
        <div className="form__input-wrapper">
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            { ...register('phone', {
              pattern: { value: /^[0-9+\- +()]*$/, message: 'Invalid phone number' },
            }) }
            type="text"
            placeholder=""
            maxLength={ 20 }
          />
          { errors.phone && <div className="form__input-error">{ errors.phone.message }</div> }
        </div>

        <div className="form__input-wrapper">
          <label htmlFor="subject">Subject:</label>
          <input
            id="subject"
            { ...register('subject') }
            type="text"
            maxLength={ 200 }
            placeholder="e.g., Gig request, song feedback, just saying hi"
          />
          { errors.phone && <div className="form__input-error">{ errors.phone.message }</div> }
        </div>

        { /* Message */ }
        <div className="form__input-wrapper">
          <label htmlFor="message">Message <em>(*)</em>:</label>
          <textarea
            maxLength={ 4000 }
            id="message"
            { ...register('message', { required: 'Message is required' }) }
            rows="5"
            placeholder="Your message"
          />
          { errors.message && <div className="form__input-error">{ errors.message.message }</div> }
        </div>

        <input type="hidden" { ...register('cfToken') } />
        {
          errors.cfToken && (
            <div className="form__input-wrapper">
              <div className="form__input-error">{ errors.cfToken.message }</div>
            </div>
          )
        }

        <div className="form__cf-widget" ref={ widgetContainerWrapperRef }>
          <div ref={ widgetContainerRef } className="form__cf-widget-ext" />
          <div className="form__cf-widget-message">
            We’re just verifying that you’re human before submitting — this helps keep the site free from spam.
          </div>
        </div>

        <div className="form__input-wrapper">
          <p>
            This site uses Cloudflare Turnstile to protect against spam and automated abuse.
            Turnstile runs a lightweight, privacy-friendly check in the background to confirm
            that form submissions are made by people rather than bots.
          </p>
        </div>

        <SubmitFormButton/>
      </form>
    </article>
  );
};

const ThankYou = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setTempUtilValue('isContactFormSent', null));
      dispatch(setTempUtilValue('isContactFormSending', null));
    };
  }, [dispatch]);

  return (
    <article className="form__thank-you">
      <strong>Thank you for reaching out! </strong>
      <p>
        Your message has been sent successfully, and we’ll get back to you as soon as possible.
      </p>
    </article>
  );
};

const SentWrapper = () => {
  const { isContactFormSent } = useSelector((state) => state.utils.temp);

  if (isContactFormSent) {
    return (
      <ThankYou />
    );
  }

  return (
    <PageForm />
  );
};

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTempUtilValue('isContactFormSent', null));

    return () => {
      dispatch(setTempUtilValue('isContactFormSending', null));
    };
  }, [dispatch]);

  return (
    <div className="contact">
      <PageTitle/>
      <HomeHeader/>
      <div className="contact__content">
        <div className="contact__content-1">

        </div>
        <div className="contact__content-2">
          <SentWrapper/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
