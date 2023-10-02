let map_button = document.querySelector('#show-map-button');
let map = document.querySelector('#map');
let places_container = document.querySelector('#places-container');
let ll_map = null;
let layerGroup = null;

const myLocMarker = L.icon({
    iconUrl: "image/marker/myloc.svg",
    iconSize:     [30, 45],
    popupAnchor:  [0, -45],
    iconAnchor:   [15, 45]
});

const PlaceMarker = L.icon({
    iconUrl: "image/marker/places.svg",
    iconSize:     [30, 45],
    popupAnchor:  [0, -45],
    iconAnchor:   [15, 45]
});

map_button.addEventListener('click', () => {
    // A OPTIMISER
    map_mode = !map_mode;

    let footer = document.querySelector('#footer');

    if (map_mode) {
    map_button.classList.add('hidden');
        places_container.classList.remove('fade-in');
        footer.classList.remove('fade-in');
        places_container.classList.add('fade-out');
        footer.classList.add('fade-out');
    setTimeout(() => {
        places_container.classList.add('display-none');
        footer.classList.add('display-none');
        map.classList.remove('display-none');
        map.classList.remove('fade-out');
        map.classList.add('fade-in');
        map_button.querySelector('p').innerHTML = 'Show list';
        map_button.querySelector('img').src = 'image/list.svg';
        map_button.classList.remove('hidden');
    }, 1000);

    mapSetup();
    layerGroup = L.layerGroup().addTo(ll_map);
    createPlaces();
    L.marker([latitude, longitude], {
        icon: myLocMarker
    }).addTo(ll_map).bindPopup('You are here.');

    setTimeout(function(){ll_map.invalidateSize(true);},1000);

    } else {
        map_button.classList.add('hidden');
        map.classList.remove('fade-in');
        map.classList.add('fade-out');
        setTimeout(() => {
            map.classList.add('display-none');
            footer.classList.remove('display-none');
            places_container.classList.remove('display-none');
            footer.classList.remove('fade-out');
            places_container.classList.remove('fade-out');
            footer.classList.add('fade-in');
            places_container.classList.add('fade-in');
            map_button.querySelector('p').innerHTML = 'Show map';
            map_button.querySelector('img').src = 'image/map.svg';
            map_button.classList.remove('hidden');
        }, 1000);

        createPlaces(false);
    }
});



function mapSetup() {
    ll_map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(ll_map);
}