const faker = require('faker');

const {shuffle, random} = require('lodash');

const DEFAULT_ACTIVISTS = 50;
const DEFAULT_CAMPAIGNS = 5;

const MAX_ADMINS_PER_CAMPAIGN = 4;
const MAX_MEMBERS_PER_CAMPAIGN = 10;
const MAX_TASKS_PER_CAMPAIGN = 2;

function activists (n) {

  function* activist (n) {
      yield ({
        id: 1,
        email: 'tester@test.com',
        name: 'Testy McTestface',
        last_login: faker.date.recent(),
        joined: faker.date.past(2)
      });

      let id = 2;
      while (id <= n) {
        yield ({
          id,
          email: faker.internet.email(),
          name: faker.name.firstName() + ' ' + faker.name.lastName(),
          last_login: faker.date.recent(),
          joined: faker.date.past(1),
        });
        id++;
      }
  };

  return [...activist(n)];
}

function campaigns (n) {

  function* campaign (n) {
    let id = 1;
    while (id <= n) {
      yield ({
        id,
        name: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        logo: faker.image.avatar()
      });
      id++;
    }
  };

  return [...campaign(n)];
}

function memberships (campaigns, activists) {
  let id = 1;

  function* membership (campaigns, activists) {
    for (campaign of campaigns) {
      const shuffledActivists = shuffle(activists);

      for (let i=1; i <= random(1, MAX_ADMINS_PER_CAMPAIGN); i++)
      {
        yield {
          id,
          campaign_id: campaign.id,
          activist_id: shuffledActivists.pop().id,
          membership: 'admin'
        };
        id++;
      }

      for (let i=1; i <= random(1, MAX_MEMBERS_PER_CAMPAIGN); i++)
      {
        yield {
          id,
          campaign_id: campaign.id,
          activist_id: shuffledActivists.pop().id,
          membership: 'member'
        };
        id++;
      }
    }
  }

  return [...membership(campaigns, activists)];
}

function tasks (campaigns) {
  let id = 1;

  function* task (campaigns) {
    for (campaign of campaigns) {
      for (let i=0; i < random(0, MAX_TASKS_PER_CAMPAIGN);i++) {
        yield {
          id,
          campaign_id: campaign.id,
          instructions: faker.lorem.sentences(2),
          due_date: faker.date.future(0),
        };
        id++;
      }
    }
  }

  return [...task(campaigns)];
}

function task_completions (tasks, membership) {
  function* task_completion (tasks, membership) {
    let id = 1;

    for (task of tasks) {

      const eligibleActivists = shuffle(
        membership.filter(
          membership => membership.campaign_id === task.campaign_id
        )
      );

      const numberOfEligibleActivists = eligibleActivists.length;
      
      if (numberOfEligibleActivists > 0) {
        for (i = 1; i <= random(0, numberOfEligibleActivists); i++ ) {
          
          yield {
            id,
            task_id: task.id,
            activist_id: eligibleActivists.pop().activist_id,
          }
          id++;
        }
      }
    }
  }
  return [...task_completion(tasks, membership)];
}

function generate (totalActivists, totalCampaigns) {

  const ACTIVISTS = totalActivists || DEFAULT_ACTIVISTS;
  const CAMPAIGNS = totalCampaigns || DEFAULT_CAMPAIGNS;

  const output = {}

  output.activist = activists(ACTIVISTS);
  output.campaign = campaigns(CAMPAIGNS);
  output.membership = memberships(output.campaign, output.activist);
  output.task = tasks(output.campaign);
  output.task_completion = task_completions(output.task, output.membership);
  return output;
}

module.exports = generate;
