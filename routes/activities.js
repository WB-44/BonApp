const router = require('express').Router();
const { getActivities } = require("../controllers/activities");

/* GET product list */
router.get('/', async function(req, res, next) {
    try {
        res.json(await getActivities(req.query.page));
    } catch (err) {
        next(err);
    }
});

module.exports = router;