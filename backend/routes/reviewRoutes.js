const express = require('express')
const { fetchReviews, createReview } = require('../controllers/reviewControllers')
const router = express.Router()

router.post('/createReview', createReview)
router.get('/fetchReviews/:productId', fetchReviews)

module.exports = router