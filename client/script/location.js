const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
};

let latitude = 0;
let longitude = 0;

function success(pos) {
    const crd = pos.coords;
    console.log(`Your current position is: ${crd.latitude}, ${crd.longitude}`);

    latitude = crd.latitude;
    longitude = crd.longitude;

    fetch(`api/places/distance/${crd.latitude}/${crd.longitude}`)
        .then(response => { return response.json(); })
        .then(data => {
            placesList = data.data;
            createPlaces();
        });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
