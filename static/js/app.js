function parseState(json) {

    for (let i = 0; i < json.results.length; i++) {

        const parts = json.results[i].address_components;

        for (let j = 0; j < parts.length; j++) {

            if (parts[j].types.indexOf('administrative_area_level_1') !== -1) {

                return parts[j].short_name;

            }

        }

    }

}

function selectState(s) {

    document.querySelectorAll('.select-state').forEach(select => {

        select.value = s;

    });

}

function saveStateSelection(e) {

    localStorage.setItem('state', e.target.value);

}

function goToGigs(e) {

    window.location = `/drone-pilot-jobs/${e.target.previousElementSibling.value}`;

}

function fail() {

    localStorage.setItem('state', 'n/a');

}
 
const state = localStorage.getItem('state');

if (state !== 'n/a') {

    const states = [...document.querySelectorAll('.select-state option')].map(opt => opt.value);

    if (state && states.indexOf(state) !== -1) {

        selectState(state);

    } else if ('geolocation' in navigator) {

        navigator.geolocation.getCurrentPosition(pos => {

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&components=administrative_area&key=${atob(document.getElementById('something').innerHTML)}`)
                .then(data => data.json())
                .then(json => parseState(json))
                .then(s => {

                    if (s && states.indexOf(s) !== -1) {

                        selectState(s);

                        localStorage.setItem('state', s);

                    } else {

                        fail();

                    }

                })
                .catch(fail);
        });

    } else {

        fail();

    }

}
