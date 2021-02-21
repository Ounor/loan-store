// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = (baseURL = 'https://api.github.com/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  const getData = () => api.get('https://statsmart.ru/T29rbTn8');
  const getStatus = () => api.get('https://statsmart.ru/vj9c2rCq');
  const getCountry = () => api.get('https://ipapi.co/json/');

  return {
    getData,
    getStatus,
    getCountry,
  };
};

export default {
  create,
};
