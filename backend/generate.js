const faker = require('faker');

const REQUIREMENTS = {
  activists: 5,
  campaigns: 4,
};

function admins (campaigns, activists) {

  function* admin (campaigns, activists) {
    for (campaign of campaigns) {
      yield {
        campaign_id: campaign.id,
        activist_id: faker.random.arrayElement(activists).id
      };
    }
  }

  return [...admin(campaigns, activists)];
}

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


const output = {};


output.activists = activists(REQUIREMENTS.activists);
output.campaigns = campaigns(REQUIREMENTS.campaigns);


output.admins = [
  ...admins(output.campaigns, output.activists), //every campaign must have an admin
  ...admins(output.campaigns.slice(0, output.campaigns.length /2), output.activists) //some campaigns should have another
];

// console.log(output.campaigns.slice(output.campaigns.length /2));

console.log(output);