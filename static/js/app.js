function $(selector, callback) {

    if (callback) {

        [...document.querySelectorAll(selector)].forEach(callback);

    } else {

        return document.querySelector(selector) || document.createElement('div');

    }

}

$('.select-state', el => {

    el.onchange = e => localStorage.setItem('state', e.target.value);

});

$('.search-btn').onclick = e => {

    window.location = `${e.target.getAttribute('data-path')}/${e.target.previousElementSibling.value}`;

};

if (window.location.pathname === '/') {

    function fail() {

        localStorage.setItem('state', 'n/a');

    }

    function selectState(s) {

        $('.select-state', el => {

            el.value = s;

        });

    }

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

    const hero = $('.hero');

    if (hero && window.innerWidth > 400 && window.pageYOffset !== undefined) {

        function p() {

            window.requestAnimationFrame(() => {

                const o = Math.floor(window.pageYOffset / 5) + parseInt(window.innerWidth / 10);

                hero.setAttribute('style', 'background-position: 0 -' + o + 'px;');

            });

        }

        window.addEventListener('scroll', p);

        p();
    }

}

