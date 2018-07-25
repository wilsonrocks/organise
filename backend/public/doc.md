# ORGANISE API v1


## Helping people campaign with fewer grumpy emails

All endpoints use HTTP basic authentication. The username is an email.
Password is not currently checked. However, you will only be able to
access data that the submitted username should be able to access.

### /api/v1/authenticate

#### GET

Checks the supplied credentials. Returns 401 if unauthorised or a 200
with no information if everything is okay.

### /api/v1/activist

#### GET

Returns the details of the activist with the email address given in the authentication, along with a list of all the campaigns they are involved in.

Returns an object of the form

    {
      "activist": {
        "id": 1,
        "email": "tester@test.com",
        "name": "Testy McTestface",
        "joined": "2017-04-21T23:00:00.000Z"
      },
      "campaigns": [
        {
          "name": "Try and stop Brexit",
          "logo": "https://s3.amazonaws.com/uifaces/faces/twitter/ky/128.jpg",
          "description": "We need to tweet a lot, people",
          "id": 1,
          "membership": "member"
        }, ...
      ]
    }

### /api/v1/campaign/:id

#### GET

Returns the details of the campaign with the given id, along with a list of tasks that are part of that campaign

    {
      "campaign": {
          "name": "Try and stop Brexit",
          "logo": "https://s3.amazonaws.com/uifaces/faces/twitter/dahparra/128.jpg",
          "description": "We need to tweet a lot, people",
          "id": 1,
          "membership": "member"
      },

      "tasks": [
        {
          "id": 1,
          "campaign_id": 1,
          "instructions": "Enim rerum quos in eligendi. Error velit quidem dolore et.",
          "due_date": "2019-04-23T23:00:00.000Z",
          "number_assigned": 3,
          "number_completed": 0,
          "done": false
        }, ...
      ],

      "members": [
        {
            "id": 1,
            "email": "tester@test.com",
            "name": "Testy McTestface",
            "joined": "2016-08-17T23:00:00.000Z",
            "membership": "member"
        }, ...
      ]
    }


### /api/v1/task

#### POST

Creates a new task.

As we`l`l as the authentication, you need to supply a JSON object in the body of the request of the form:

    {
      campaign_id: 2,
      instructions: 'what to do',
      due_date: <a date in any form that Moment.js can understand>,
    }


Creation will fail if:

* Any fields are missing
* The campaign does not exist.
* The authenticated user does not have admin status for the specified campaign.
* due_date must is not in the future.
* due_date is not a format that [Moment.js](https://momentjs.com/) can understand.
* Instructions is an empty string

### /api/v1/task/:id

#### PATCH

Marks the task as done. The authenticated user must be a member or an admin for the task's campaign.

Returns a JSON object of the form:

    {
      "completed": {
          "id": 5766,
          "task_id": 1,
          "activist_id": 1
      }
    }

A 400 response will be returned if the task is already marked as done.

#### DELETE

Deletes the specified task. The authenticated user must be an admin for the task's campaign.

Returns a JSON object of the form:

    {
      "deleted": {
          "id": 2,
          "campaign_id": 2,
          "instructions": "Eaque omnis nobis molestias aut commodi animi corporis rem consequatur. Quasi quis numquam.",
          "due_date": "2018-12-24T00:00:00.000Z"
      }
    }
