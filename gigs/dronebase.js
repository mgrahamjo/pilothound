const states = require('./util/states');

module.exports = data => new Promise(resolve => {

    data.static = data.static || [];

    states.forEach(state => {
        
        data.static.push({
            title: 'Freelance Drone Pilot',
            source: 'DroneBase',
            state: state,
            snippet: 'Join our drone pilot community and get paid to fly your drone. Fly where you want, when you want, and leave the tedious stuff like editing processing, and payments to us.',
            url: 'https://www.dronebase.com/pilots'
        });

    });

    resolve(data);

});
