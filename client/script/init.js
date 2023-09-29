let map_mode = false;
let placesList = [];


function ScrollArrow(scrollable, leftarrow, rightarrow, direction) {
    scrollable.scrollBy({
        top: 0,
        left: direction,
        behavior: 'smooth'
    });
    enableScrollArrows(scrollable, leftarrow, rightarrow);
}

function enableScrollArrows(scrollable, leftarrow, rightarrow) {
    if (scrollable.scrollLeft <= 0) {
        leftarrow.classList.add('unable')
    } else {
        leftarrow.classList.remove('unable')
    }

    if (scrollable.scrollLeft >= scrollable.scrollWidth - scrollable.clientWidth) {
        rightarrow.classList.add('unable')
    } else {
        rightarrow.classList.remove('unable')
    }
}

function initScrollArrows() {
    let leftarrow = document.getElementById('scroll-left');
    let rightarrow = document.getElementById('scroll-right');
    let scrollable = document.getElementById('activities');

    scrollable.scrollLeft = 0;
    enableScrollArrows(scrollable, leftarrow, rightarrow);

    leftarrow.addEventListener('click', () => {
        ScrollArrow(scrollable, leftarrow, rightarrow, -100);
    });

    rightarrow.addEventListener('click', () => {
        ScrollArrow(scrollable, leftarrow, rightarrow, 100);
    });

    scrollable.addEventListener('scroll', () => {
        enableScrollArrows(scrollable, leftarrow, rightarrow);
    });
}

function initFilterButton() {
    let filterButton = document.getElementById('show-filters');
    let filter = document.getElementById('filters');

    filterButton.addEventListener('click', () => {
        filter.classList.remove('hidden');
    });

    let close_filters = document.getElementById('close-filters');

    close_filters.addEventListener('click', () => {
        filter.classList.add('hidden');
    });
}

function createActivities(activitiesList) {
    let activities = document.getElementById('activities');
    activities.innerHTML = '';
    activitiesList.forEach(activity => {
        let activityDiv = document.createElement('div');
        activityDiv.classList.add('activity');
        activityDiv.innerHTML = `
            <img src="${activity.logo}" alt="${activity.name}">
            <p>${activity.name}</p>
        `;
        activities.appendChild(activityDiv);
    });
}



function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#1d3557', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#1d3557', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#1d3557', toSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromInput.value = from;
    }
}

function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C6C6C6', '#1d3557', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
        toSlider.value = from;
    }
}

function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector('#toSlider');
    if (Number(currentTarget.value) <= 0 ) {
        toSlider.style.zIndex = 2;
    } else {
        toSlider.style.zIndex = 0;
    }
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#1d3557', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);


initScrollArrows();
initFilterButton();


fetch('/api/activities')
    .then(response => { return response.json(); })
    .then(data => {
        createActivities(data.data);
    });
