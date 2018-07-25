const faker = require('faker');

/*
activist 1:
  is member for campaign 1, admin for campaign 2, not a member of campaign 3

tasks 1-3 are from campaign 1
task 4 is from campaign 2
 
activist 1 has completed task 1
*/

const activist = [
  {
    id: 1,
    email: 'tester@test.com',
    name: 'Testy McTestface',
    joined: faker.date.past(2)
  },

  {
    id: 2,
    email: 'second@test.com',
    name: 'Tests Galore',
    joined: faker.date.past(2)
  },

  {
    id: 3,
    email: 'idris@elba.org',
    name: 'Idris Elba',
    joined: faker.date.past(2)
  },

  {
    id: 4,
    email: 'dennis.skinner@parliament.uk',
    name: 'Dennis Skinner',
    joined: faker.date.past(2)
  },

  {
    id: 5,
    email: 'margaret@oryx.crake',
    name: 'Margaret Atwood',
    joined: faker.date.past(2)
  },
];

const campaign = [
  {
    id: 1,
    name: 'Stop Brexit!',
    description: 'We need to write BLOGS, people',
    logo: faker.image.avatar(),
  },

  {
    id: 2,
    name: 'Calderdale Against School Cuts',
    description: 'Finding for school funding in Calderdale.',
    logo: faker.image.avatar(),
  },

  {
    id: 3,
    name: 'Freeciv built in to Windows 11',
    description: 'Too many blockers, always blocking.',
    logo: faker.image.avatar(),
  }
];

const membership = [
  {
    id: 1,
    campaign_id: 1,
    activist_id: 1,
    membership: 'member',
  },

  {
    id: 2,
    campaign_id: 2,
    activist_id: 1,
    membership: 'admin',
  },

  {
    id: 3,
    campaign_id: 1,
    activist_id: 3,
    membership: 'member',
  },

  {
    id: 4,
    campaign_id: 2,
    activist_id: 5,
    membership: 'admin',
  },

  {
    id: 5,
    campaign_id: 3,
    activist_id: 4,
    membership: 'member',
  },

  {
    id: 6,
    campaign_id: 3,
    activist_id: 3,
    membership: 'admin',
  },

  {
    id: 7,
    campaign_id: 3,
    activist_id: 2,
    membership: 'member',
  },

];

task = [
  {
    id: 1,
    campaign_id: 1,
    instructions: 'take out Jeremy Hunt',
    due_date: faker.date.future(0),
  },

  {
    id: 2,
    campaign_id: 1,
    instructions: 'sell lots of newspapers to like minded people',
    due_date: faker.date.future(0),
  },

  {
    id: 3,
    campaign_id: 1,
    instructions: 'hold ineffective public meeting',
    due_date: faker.date.future(0)
  },

  {
    id: 4,
    campaign_id: 2,
    instructions: 'Email your MP',
    due_date: faker.date.future(0),
  },

  {
    id: 5,
    campaign_id: 3,
    instructions: 'write a blog on medium',
    due_date: faker.date.future(0),
  },
];

const task_completion = [

  {
    id: 1,
    task_id: 1,
    activist_id: 1,
  },

  {
    id: 2,
    task_id: 1,
    activist_id: 2,
  },

  {
    id: 3,
    task_id: 3,
    activist_id: 5,
  },

  {
    id: 4,
    task_id: 4,
    activist_id: 4,
  },

  {
    id: 5,
    task_id: 4,
    activist_id: 2,
  },
];


module.exports = {
  activist,
  campaign,
  membership,
  task,
  task_completion,
};