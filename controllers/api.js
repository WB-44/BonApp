const promise = require('bluebird');
const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};
const pgp = require('pg-promise')(initOptions);
const config = require('../config');
const db = pgp(config.db);

async function getActivities(page = 1) {
    const offset = (page - 1) * [config.rowsPerPage];
    return db.task(async t => {
        const data = await t.any("SELECT * FROM activities ORDER BY id;", [offset, config.rowsPerPage]);
        const meta = {page};
        return {
            data,
            meta
        }
    });
}

async function getAllPlaces(page = 1) {
    const offset = (page - 1) * [config.rowsPerPage];
    return db.task(async t => {
        const data = await t.any("SELECT * FROM places;", [offset, config.rowsPerPage]);
        const meta = {page};
        return {
            data,
            meta
        }
    });
}

async function getAllPlacesWithDistance(page = 1, latitude, longitude) {
    const offset = (page - 1) * [config.rowsPerPage];
    return db.task(async t => {
        const data = await t.any(`SELECT *, (point(longitude, latitude) <@> point(${longitude}, ${latitude})) * 1.60934 AS distance FROM places ORDER BY distance;`, [offset, config.rowsPerPage]);
        const meta = {page};
        return {
            data,
            meta
        }
    });
}

async function getAllPlacesWithDistanceByActivity(page = 1, latitude, longitude, activity) {
    const offset = (page - 1) * [config.rowsPerPage];
    return db.task(async t => {
        const data = await t.any(`select p.*, (point(p.longitude, p.latitude) <@> point(${longitude}, ${latitude})) * 1.60934 AS distance from activities_available aa JOIN places p ON aa.place_id = p.id where aa.activity_id = ${activity} ORDER BY distance;`, [offset, config.rowsPerPage]);
        const meta = {page};
        return {
            data,
            meta
        }
    });
}

async function getPlace(id) {
    return db.task(async t => {
        const data = await t.one("SELECT * FROM places WHERE id = $1;", id);
        return {
            data
        }
    });
}

async function getPlaceActivities(id) {
    return db.task(async t => {
        const data = await t.any("SELECT a.name, a.logo FROM activities_available aa, activities a WHERE aa.place_id = $1 and aa.activity_id = a.id;", id);
        return {
            data
        }
    });
}

async function getOpenHours(id) {
    return db.task(async t => {
        const data = await t.any("SELECT * FROM opening_hours WHERE place_id = $1 ORDER BY day_of_the_week;", id);
        return {
            data
        }
    });
}

module.exports = {
    getActivities,
    getAllPlaces,
    getAllPlacesWithDistance,
    getAllPlacesWithDistanceByActivity,
    getPlace,
    getPlaceActivities,
    getOpenHours
}