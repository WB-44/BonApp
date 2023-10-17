function initAllContainers(data) {
    document.querySelector('#place-name').innerHTML = data.name;
    document.querySelector('#address').innerHTML = 'Address : ' + data.address;
    document.querySelector('#phone-number').innerHTML = 'Phone Number : ' + data.phone_number;
    document.querySelector('#website').innerHTML = `Website : <a href="https://${data.website}">${data.website}</a>`;
    document.querySelector('#place-image').src = data.photo;
}

function createTags(data) {
    data.forEach(activity => {
        let tag = document.createElement('div');
        tag.classList.add('tag');
        tag.innerHTML = `<img src="${activity.logo}" alt="${activity.name}"><p>${activity.name}</p>`;

        document.querySelector('#tags').appendChild(tag);
    });
}


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch(`api/places/id/${id}`)
    .then(response => { return response.json(); })
    .then(data => {
        initAllContainers(data.data)
    });

fetch(`api/places/id/${id}/activities`)
    .then(response => { return response.json(); })
    .then(data => {
        createTags(data.data)
    });


