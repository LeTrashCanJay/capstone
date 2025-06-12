import axios from 'axios';

export const getEulaStatus = async (user_id) => {
  const res = await axios.get('/api/eula-status', {
    params: { user_id }
  });
  return res.data.accepted === 1;
};
