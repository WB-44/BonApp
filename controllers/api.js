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
        const data = await t.any("SELECT * FROM activities ORDER BY name;", [offset, config.rowsPerPage]);
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


module.exports = {
    getActivities,
    getAllPlaces,
    getAllPlacesWithDistance,
    getAllPlacesWithDistanceByActivity
}