import React from 'react';

import MemberTask from './MemberTask';


class TaskList extends React.Component {

  state = {
    campaign: {
        "id": 1,
        "name": "Shut down the tories",
        "description": "We won't have a fair society till they are dealt with. Guillotine!",
        "logo": "https://www.google.co.uk/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiModuihKLcAhWDPhQKHRuwCjcQjRx6BAgBEAU&url=http%3A%2F%2Fwww.iconarchive.com%2Fshow%2Fwindows-8-icons-by-icons8%2FHands-Clenched-Fist-icon.html&psig=AOvVaw0LSZarxCtmEG9qJ2DuRVvs&ust=1531775960869596"
    },
    tasks: [
      {
          "id": 1,
          "campaign_id": 1,
          "instructions": "Id ut dolores rerum vel consequatur. Repudiandae praesentium officia vitae et culpa officiis magni.",
          "due_date": "2018-08-03T23:00:00.000Z"
      },
      {
          "id": 2,
          "campaign_id": 1,
          "instructions": "Qui ut blanditiis. Maiores nostrum dolores sit sapiente qui in corrupti corporis.",
          "due_date": "2019-05-21T23:00:00.000Z"
      },
      {
          "id": 4,
          "campaign_id": 1,
          "instructions": "Tempore minima consequatur ab. Quod et commodi est eos.",
          "due_date": "2019-04-24T23:00:00.000Z"
      }
  ]
  }

  render () {

    const {id: campaignId} = this.props.match.params;
    const {tasks, campaign:{name, logo}} = this.state;
    return (
    <div>
      <h2>{name}</h2>
      <h3>Outstanding Tasks</h3>
      <img src={logo}/>
      {
        tasks.map(({id, instructions, due_date}) => <MemberTask
          key={id}
          instructions={instructions}
          due_date={due_date}
          doneCallback={e=>console.log('click done')}
        />)
      }
    
    </div>
    );
  }
}

export default TaskList;