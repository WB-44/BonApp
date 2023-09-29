function createPlace(place) {
    place.distance = Math.round(place.distance * 100) / 100 + ' km';
    let placeSection = document.createElement('section');
    placeSection.classList.add('place');
    placeSection.innerHTML = `
            <div class="place-image">
                <img src="${place.photo}" alt="${place.name}">
            </div>
            <div class="information">
                <p class="place-name">${place.name}</p>
                <p class="place-address">${place.address}</p>
                <p class="place-distance">${place.distance}</p>
            </div>
        `;
    return placeSection;
}


function createPlaces(fade_in = true) {
    if (!map_mode) {
        let main = document.querySelector('#places-container');

        if (fade_in) {
        let places = document.querySelectorAll('.place');
        places.forEach(place => {
            place.classList.add('fade-out');
            setTimeout(() => {
                place.remove();
            }, 1000);
        });

            setTimeout(() => {
                //main.innerHTML = '';
                placesList.forEach(place => {
                    let placeSection = createPlace(place);

                    placeSection.classList.add('fade-in');
                    main.appendChild(placeSection);
                });
            }, 1000);

        } else {
            main.innerHTML = '';
            placesList.forEach(place => {
                main.appendChild(createPlace(place));
            });
        }

    } else {
        placesList.forEach(place => {
            L.marker([place.latitude, place.longitude]).addTo(ll_map)
                .bindPopup(place.name)
                .openPopup();
        });
    }
}
/*
fetch('/api/places')
    .then(response => { return response.json(); })
    .then(data => { createPlaces(data.data); });
*/