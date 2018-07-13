import request from 'superagent';

const BASE_URL = 'http://localhost:3000/api/v1';

export function getActivistDetails (email, password) {
  return request
  .get(`${BASE_URL}/activist`)
  .auth(email, password)
  .then(response => response.body)
  .catch(error => null);
  

}

