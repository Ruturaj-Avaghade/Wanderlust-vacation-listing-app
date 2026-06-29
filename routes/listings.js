const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  indexPage,
  addNewListing,
  createNewListing,
  showListing,
  getEditListing,
  updateListing,
  destroyListing,
} = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  // index route
  .get(wrapAsync(indexPage))

  // // create new listing , here used wrapAsync function for async error handling
  .post(
    isLoggedIn("create new listing"),
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createNewListing),
  );

//get new listing page route
router.get("/new", isLoggedIn("add new listing"), wrapAsync(addNewListing));

router
  .route("/:id")
  // show listing route
  .get(wrapAsync(showListing))

  // update listing Route
  .put(
    isLoggedIn("update this listing"),
    upload.single("listing[image]"),
    validateListing,
    isOwner,
    wrapAsync(updateListing),
  )

  // Delete listing Route
  .delete(
    isLoggedIn("delete this listing"),
    isOwner,
    wrapAsync(destroyListing),
  );

// edit listing Route,
router.get(
  "/:id/edit",
  isLoggedIn("edit a listing"),
  isOwner,
  wrapAsync(getEditListing),
);

module.exports = router;
