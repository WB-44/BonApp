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

initScrollArrows();
initFilterButton();

fetch('/api/activities')
    .then(response => { return response.json(); })
    .then(data => {
        createActivities(data.data);
    });