import axios from 'axios';
import { apiPath } from '../constants';

export default {
  get: endpoint => axios.get(apiPath + endpoint),
  post: (endpoint, body) => axios.post(apiPath + endpoint, body),
  put: (endpoint, body) => axios.put(apiPath + endpoint, body),
  delete: endpoint => axios.delete(apiPath + endpoint),
};
