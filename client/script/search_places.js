function createPlaces(placesList) {
    let main = document.querySelector('main');
    main.innerHTML = '';
    placesList.forEach(place => {
        let placeSection = document.createElement('section');
        placeSection.classList.add('place');
        placeSection.innerHTML = `
            <div class="place-image">
                <img src="${place.image}" alt="${place.name}">
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

let placesList = [
    {name: 'Restaurant', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'},
    {name: 'Bar', image: 'https://a0.muscache.com/im/pictures/5bfac08b-1294-4f23-9a51-bb7073b1d299.jpg?im_w=720', address: 'Umea', distance: '2 km'}
];

createPlaces(placesList);
