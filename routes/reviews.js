const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const Review = require("../models/review.js");
const Listing = require('../models/listing.js');
const reviewController = require("../controllers/reviews.js");
const passport = require("passport");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");
const passportLocal = require('passport-local');


//reviwes
// save reviwes
router.post("/",isLoggedIn("save review") ,validateReview, wrapAsync(reviewController.saveReview));

// Delete Reviews 
router.delete("/:reviewId",isLoggedIn("delete review"),isReviewAuthor, 
wrapAsync(reviewController.destroyReview));

module.exports = router;