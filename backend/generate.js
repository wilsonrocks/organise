const faker = require('faker');

const {shuffle, random} = require('lodash');

const ACTIVISTS = 30;
const CAMPAIGNS = 5;
const MAX_ADMINS_PER_CAMPAIGN = 3;
const MAX_MEMBERS_PER_CAMPAIGN = 8

function activists (n) {

  function* activist (n) {
      let id = 1;
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

const output = {};

output.activists = activists(ACTIVISTS);
output.campaigns = campaigns(CAMPAIGNS);

output.admins = memberships(output.campaigns, output.activists);

console.log(output);