const Axios = require('axios');

const HTTP = Axios.create({
  baseURL: HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});
