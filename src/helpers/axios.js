import axios from 'axios';
import CustomStorage from './storage';
import { showErrorNotification } from '../redux/slices/utils/actions';
import { storage as storageConfig } from '../config';

const customStorage = new CustomStorage();
let store;

const clearLocalStorage = () => {
  const storageKeys = Object.keys(storageConfig.NAMES);
  storageKeys.filter((key) => !storageConfig.PERSISTENT.includes(key)).forEach((key) => {
    customStorage.remove(storageConfig.NAMES[key]);
  });
};

// expose this method to allow Redux store to be injected at start up time,
// to avoid circular dependency issues
export const injectStore = (_store) => {
  store = _store;
};

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = customStorage.getDecrypted(storageConfig.NAMES.ACCESS_TOKEN);
    const appLanguage = customStorage.getDecrypted(storageConfig.NAMES.SELECTED_LANGUAGE);

    if (token) {
      config.headers.Authorization = token;
    }

    const language = appLanguage || process.env.DEFAULT_APP_LANGUAGE || 'en-GB';

    const url = new URL(config.url, config.baseURL); // Handle relative URLs based on baseURL
    url.searchParams.set('lng', language); // Add or update the `lng` query parameter
    config.url = url.href; // Update the request URL
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const originalRequest = error.config;
    const responseStatus = error?.response?.status || null;
    const errorMessage = error?.response?.data?.error || error?.response?.message || '';
    const errors = error?.response?.data?.errors || null;

    if (!responseStatus || ![403, 401, 404, 400, 429, 409].includes(responseStatus)) {
      store.dispatch(showErrorNotification(
        `Whoops! We couldn&apos;t complete the request to the API. (Error: ${responseStatus}).
         ${errorMessage ? `<br/>${errorMessage}` : ''}
         ${originalRequest?.url ? `<br/>Original url: ${originalRequest.url}` : ''}
         ${errors ? `<hr/>${errors.join('<br/>')}` : ''} 
        `,
      ));
      return null;
    }

    if (responseStatus === 403) {
      customStorage.setEncrypted(storageConfig.NAMES.API_AUTHORISATION_ERROR, { error: errorMessage });
      window.location.href = '/';
      return;
    }

    // If refresh token fails
    if (responseStatus === 401 && error.config.url.indexOf('user/refresh') !== -1) {
      processQueue(error, null);
      isRefreshing = false;
      return Promise.reject(error);
    }

    // Check if original request
    if (responseStatus === 401 && !originalRequest._retry) {
      // Push all the failed request due to expired token to queue
      if (isRefreshing) {

        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
          .then((token) => {
            originalRequest.headers.Authorization = `Token ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Try to refresh token
      return new Promise((resolve, reject) => {
        axios.post(
          `${process.env.REACT_APP_USER_SERVICE}/user/refresh`,
          {},
          { headers: { Authorization: customStorage.getDecrypted(storageConfig.NAMES.REFRESH_TOKEN) } },
        )
          /*
           On success save token, set headers and start processing
           previously failed requests with new token
           */
          .then((response) => {
            const { tokens } = response.data.data;
            // store.dispatch(updateUserAfterRefresh(response.data.data));

            const accessToken = tokens.accessToken.token;
            axios.defaults.headers.common.Authorization = accessToken;
            originalRequest.headers.Authorization = accessToken;
            processQueue(null, accessToken);
            resolve(axiosInstance(originalRequest));
          })
          /*
           On error proccess old failed request with token value null
           and redirect to respective authentication page
           */
          .catch((err) => {
            processQueue(err, null);
            reject(err);
            clearLocalStorage();
            // store.dispatch(setLogoutUser());

            if (!window?.location?.href) {
              return;
            }

            if(['/', '/en-GB'].indexOf(window.location.href) === -1) {
              window.location.replace('/');
            }
          })
          /*
           Finally set isRefreshing token to false in either success or failure
           */
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    if (![409, 404].includes(responseStatus)) {
      store.dispatch(showErrorNotification(error.response.data.error));
    }
    return Promise.reject(error.response.data);
  },
);

const searchAxios = axios.create({
  headers: { 'x-typesense-api-key': process.env.REACT_APP_PUBLIC_SEARCH_API_KEY },
});

const fileUploader = axios.create();
const cleanAxios = axios.create();

export { fileUploader, cleanAxios, axios as realAxios, searchAxios };

export default axiosInstance;
