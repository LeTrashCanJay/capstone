import axios from 'axios';

export const saveCookiePreferences = async (prefs) => {
  return axios.post('/api/cookie-settings', prefs);
};

export const getCheckoutSummary = async (user_id) => {
  const res = await axios.get('/api/checkout-summary', {
    params: { user_id }
  });
  return res.data;
};
