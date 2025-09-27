const express = require("express");
const {getMoviesController,
    createMoviesController,} = require ('../controllers/moviesController');

const router = express.Router();

router.get('/movies', getMoviesController);
router.post('/movies', createMoviesController);

module.exports = router;