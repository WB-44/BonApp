function formatNumber(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function initAllContainers(data) {
    document.querySelector('#place-name').innerHTML = data.name;
    document.querySelector('#address').innerHTML = 'Address : ' + data.address;
    document.querySelector('#phone-number').innerHTML = 'Phone Number : ' + data.phone_number;
    document.querySelector('#website').innerHTML = `Website : <a href="https://${data.website}">${data.website}</a>`;
    document.querySelector('#place-image').src = data.photo;
    document.querySelector('#place-image').alt = data.name;

    let description = data.description;
    description = description.replaceAll('\\n', '<br>');
    document.querySelector('#place-description p').innerHTML = description;

}

function createTags(data) {
    data.forEach(activity => {
        let tag = document.createElement('div');
        tag.classList.add('tag');
        tag.innerHTML = `<img src="${activity.logo}" alt="${activity.name}"><p>${activity.name}</p>`;

        document.querySelector('#tags').appendChild(tag);
    });
}

function addOpeningHours(data) {
    let dayContainer = document.querySelector('#opening-hours');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (let i = 0; i < 7; i++) {
       let day = document.createElement('p');
       if (data[i].open === false) {
           day.innerHTML = `${days[i]} : Closed`;
       }
       else {
           day.innerHTML = `${days[i]} : ${formatNumber(data[i].opening_hour)}:${formatNumber(data[i].opening_minute)} - ${formatNumber(data[i].closing_hour)}:${formatNumber(data[i].closing_minute)}`;
       }
       dayContainer.appendChild(day);
    }
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

fetch(`api/places/id/${id}/openhours`)
    .then(response => { return response.json(); })
    .then(data => {
        addOpeningHours(data.data)
    });

