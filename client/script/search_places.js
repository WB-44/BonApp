function createPlace(place) {
    let distance = Math.round(place.distance * 100) / 100 + ' km';
    let placeSection = document.createElement('section');
    placeSection.classList.add('place');
    placeSection.innerHTML = `
            <div class="place-image">
                <img src="${place.photo}" alt="${place.name}">
            </div>
            <div class="information">
                <p class="place-name">${place.name}</p>
                <p class="place-address">${place.address}</p>
                <p class="place-distance">${distance}</p>
            </div>
        `;
    placeSection.addEventListener('click', () => {
        window.open( `/place.html?id=${place.id}`, '_blank');
    });
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
        layerGroup.clearLayers();
        placesList.forEach(place => {
            let distance = Math.round(parseFloat(place.distance) * 100) / 100 + ' km';
            let marker = L.marker([place.latitude, place.longitude], {
                icon: PlaceMarker
            }).addTo(ll_map).bindPopup(`<p>${place.name}</p><p>${place.address}</p><p>${distance}</p>`);
            layerGroup.addLayer(marker);
        });
    }
}
/*
fetch('/api/places')
    .then(response => { return response.json(); })
    .then(data => { createPlaces(data.data); });
*/