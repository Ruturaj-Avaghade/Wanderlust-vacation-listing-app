const Listing = require("../models/listing.js");
const opencage = require("opencage-api-client");
const { search } = require("../routes/listings.js");

module.exports.indexPage = async (req, res) => {
  const { search } = req.query;
  const { category } = req.query;

  let allListings;

  if (search) {
    allListings = await Listing.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
      ],
    });
  } else if (category) {
    allListings = await Listing.find({
      category: { $regex: category, $options: "i" },
    });
  } else {
    allListings = await Listing.find({});
  }

  res.render("./listings/index.ejs", { allListings });
};

module.exports.addNewListing = async (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createNewListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let listing = new Listing(req.body.listing);
  listing.owner = req.user._id;
  listing.image = { url, filename };

  const data = await opencage.geocode({
    q: listing.location,
    key: process.env.OPENCAGE_API_KEY,
  });

  listing.geometry = {
    type: "point",
    coordinates: [data.results[0].geometry.lng, data.results[0].geometry.lat],
  };

  await listing.save();
  req.flash("success", "New listing created !");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.getEditListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for doesn't exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing);

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };

    const data = await opencage.geocode({
      q: listing.location,
      key: process.env.OPENCAGE_API_KEY,
    });

    listing.geometry = {
      type: "point",
      coordinates: [data.results[0].geometry.lng, data.results[0].geometry.lat],
    };

    await listing.save();
  }

  req.flash("success", "listing updated !");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted !");
  res.redirect("/listings");
};
