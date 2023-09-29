let map_button = document.querySelector('#show-map-button');
let map = document.querySelector('#map');
let places_container = document.querySelector('#places-container');
let ll_map = null;
map_button.addEventListener('click', () => {
    map_mode = !map_mode;

    let footer = document.querySelector('#footer');

   // create a fade out effect for the places container
    places_container.classList.add('fade-out');
    footer.classList.add('fade-out');
    setTimeout(() => {
        places_container.classList.add('display-none');
        footer.classList.add('display-none');
        map.classList.remove('display-none');
        map.classList.add('fade-in');
    }, 1000);

    setTimeout(function(){ll_map.invalidateSize(true);},1000);

    mapSetup();
    createPlaces();
    L.marker([latitude, longitude]).addTo(ll_map)
        .bindPopup('You are here.')
        .openPopup();
});



function mapSetup() {
    ll_map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(ll_map);
}