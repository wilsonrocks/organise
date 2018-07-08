const faker = require('faker');

const {shuffle, random} = require('lodash');

const ACTIVISTS = 10;
const CAMPAIGNS = 5;
const ADMINS_PER_CAMPAIGN = 4;

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

function admins (campaigns, activists) {
  let id = 1;

  function* admin (campaigns, activists) {
    for (campaign of campaigns) {
      const shuffledActivists = shuffle(activists);
      
      for (let i=1; i <= random(1, ADMINS_PER_CAMPAIGN); i++)
      {
        yield {
          id,
          campaign_id: campaign.id,
          activist_id: shuffledActivists.pop().id
        };
        id++;
      }
    }
  }

  return [...admin(campaigns, activists)];
}

const output = {};

//there should be some activists
output.activists = activists(ACTIVISTS);
//there should be some campaigns
output.campaigns = campaigns(CAMPAIGNS);

output.admins = [
  //every campaign must have an admin
  ...admins(output.campaigns, output.activists), 
  //some campaigns should have another
  // ...admins(output.campaigns.slice(0, output.campaigns.length /2), output.activists) 
];

console.log(output);