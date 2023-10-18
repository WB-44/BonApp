const router = require('express').Router();
const { getActivities, getAllPlaces, getAllPlacesWithDistance, getAllPlacesWithDistanceByActivity, getPlace, getPlaceActivities, getOpenHours } = require("../controllers/api");

/* GET product list */
router.get('/activities/', async function(req, res, next) {
    try {
        res.json(await getActivities(req.query.page));
    } catch (err) {
        next(err);
    }
});

router.get('/places/', async function(req, res, next) {
    try {
        res.json(await getAllPlaces(req.query.page));
    } catch (err) {
        next(err);
    }
});

router.get('/places/distance/:latitude/:longitude', async function(req, res, next) {
    try {
        res.json(await getAllPlacesWithDistance(req.query.page, req.params.latitude, req.params.longitude));
    } catch (err) {
        next(err);
    }
});

router.get('/places/distance/:latitude/:longitude/:activity', async function(req, res, next) {
    try {
        res.json(await getAllPlacesWithDistanceByActivity(req.query.page, req.params.latitude, req.params.longitude, req.params.activity));
    } catch (err) {
        next(err);
    }
});

router.get('/places/id/:id', async function(req, res, next) {
    try {
        res.json(await getPlace(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.get('/places/id/:id/activities', async function(req, res, next) {
    try {
        res.json(await getPlaceActivities(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.get('/places/id/:id/openhours', async function(req, res, next) {
    try {
        res.json(await getOpenHours(req.params.id));
    } catch (err) {
        next(err);
    }
});


module.exports = router;