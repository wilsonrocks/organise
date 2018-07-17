import request from 'superagent';

const BASE_URL = 'http://localhost:3000/api/v1';

export function authenticate (email, password) {
  return request
  .get(`${BASE_URL}/authenticate`)
  .auth(email, password)
  .then(response => true)
  .catch(error => false);
}

export function getActivistDetails (email, password) {
  return request
  .get(`${BASE_URL}/activist`)
  .auth(email, password)
  .then(response => response.body)
  .catch(error => null);
}

export function getTasksForCampaign (email, password, id) {
  return request
  .get(`${BASE_URL}/campaign/${id}`)
  .auth(email, password)
  .then(response => response.body)
  .catch(error => null);

}

export function completeTask (email, password, id) {
  return request
  .patch(`${BASE_URL}/task/${id}`)
  .auth(email, password)
  .then(response => response.body);
}