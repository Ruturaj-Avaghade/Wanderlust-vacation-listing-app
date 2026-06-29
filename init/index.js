if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "../.env" });
}

const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user.js");
const initData = require("./data.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  console.log(dbUrl);
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  const Owner = await User.findOne({ username: "ruturaj21" });
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: Owner._id,
  }));
  await Listing.insertMany(initData.data);
  console.log("All data inserted");
};

initDB();
