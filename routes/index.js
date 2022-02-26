const router = require('express').Router();
//import routes from API
const apiRoutes = require('./api/');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('Uh-Oh 404 Error! 😖');
})

module.exports = router;