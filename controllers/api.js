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
        const data = await t.any("SELECT * FROM activities", [offset, config.rowsPerPage]);
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
        const data = await t.any("SELECT * FROM places", [offset, config.rowsPerPage]);
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


module.exports = {
    getActivities,
    getAllPlaces,
    getAllPlacesWithDistance
}