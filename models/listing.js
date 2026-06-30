const mongoose = require("mongoose");
const Review = require("./review.js");
const User = require("./user.js");
const { required } = require("joi");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },

  description: {
    type: String,
  },

  image: {
    url: String,
    filename: String,
  },

  price: {
    type: Number,
  },

  location: {
    type: String,
  },

  geometry: {
    type: {
      type: String,
      enum: ["point"],
    },
    coordinates: {
      type: [Number],
    },
  },

  country: {
    type: String,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({
      _id: {
        $in: listing.reviews,
      },
    });

    console.log("child deleted succesfully");
  }
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;
