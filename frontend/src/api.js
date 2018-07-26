import request from 'superagent';

const BASE_URL = 'http://ec2-35-176-189-96.eu-west-2.compute.amazonaws.com/api/v1';

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
}

export function completeTask (email, password, id) {
  return request
  .patch(`${BASE_URL}/task/${id}`)
  .auth(email, password)
  .then(response => response.body)
  .catch(error=>console.dir(error.response.body));
}

export function deleteTask (email, password, id) {
  return request
  .delete(`${BASE_URL}/task/${id}`)
  .auth(email, password)
  .then(response => response.body);
}

export function createTask (email, password, campaign_id, instructions, due_date) {
  return request
  .post(`${BASE_URL}/task`)
  .auth(email, password)
  .send({campaign_id, instructions, due_date})
  .then(response => {
    return response.body;
  });
}