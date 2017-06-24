const states = require('./util/states');

module.exports = data => new Promise(resolve => {

    data.static = data.static || [];

    states.forEach(state => {
        
        data.static.push({
            title: 'Unmanned Aircraft Systems Operator',
            source: 'Army',
            state: state,
            snippet: 'Unmanned Aircraft Systems Operators are remote pilots of unmanned observation aircrafts, aka military drones, or UAVs (unmanned aerial vehicles) that gather intelligence used in operational tactics. Our drone operators are intelligence specialists; they are integral to providing Army personnel with information about enemy forces and battle areas.',
            url: 'https://www.goarmy.com/careers-and-jobs/browse-career-and-job-categories/transportation-and-aviation/unmanned-aerial-vehicle-operator.html'
        });

        data.static.push({
            title: 'Unmanned Aircraft Systems Repairer',
            source: 'Army',
            state: state,
            snippet: 'The unmanned aircraft repairer is primarily responsible for the maintenance functions on Unmanned Aerial Vehicles. They keep the aircrafts ready to fly and ensure their ability to collect and transmit information.',
            url: 'https://www.goarmy.com/careers-and-jobs/browse-career-and-job-categories/transportation-and-aviation/unmanned-aircraft-systems-repairer.html'
        });

    });

    resolve(data);

});
