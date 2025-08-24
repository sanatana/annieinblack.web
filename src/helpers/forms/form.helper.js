import axios from 'axios';
import { compress, compressToBase64 } from 'lz-string';

export const sendApiContactForm = async (data, userId) => {
  const temp = {
    host: location.host,
    userId,
    agent: navigator.userAgent,
    vendor: navigator.vendor || null,
  };

  const signature = compressToBase64(compress(JSON.stringify(temp)));
  const url = `${process.env.REACT_APP_API_URL}/support/contact`;
  const response = await axios.post(url, { ...data, signature });
  return response?.status || null;
};

