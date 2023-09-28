const router = require('express').Router();
const { getActivities, getAllPlaces } = require("../controllers/api");

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

module.exports = router;