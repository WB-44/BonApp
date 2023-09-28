function createPlaces(placesList) {
    let main = document.querySelector('main');
    main.innerHTML = '';
    placesList.forEach(place => {
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
        main.appendChild(placeSection);
    });
}

fetch('/api/places')
    .then(response => { return response.json(); })
    .then(data => { createPlaces(data.data); });