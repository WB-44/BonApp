const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
};

function success(pos) {
    const crd = pos.coords;
    console.log(`Your current position is: ${crd.latitude}, ${crd.longitude}`);

    fetch(`api/places/distance/${crd.latitude}/${crd.longitude}`)
        .then(response => { return response.json(); })
        .then(data => { createPlaces(data.data); });
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
