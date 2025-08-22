const path = require("path");

const reviews = require(path.join(__dirname, "..", "public", "languages", "en-GB", "reviews.json"));
const common = require(path.join(__dirname, "..", "public", "languages", "en-GB", "common.json"));
const company = require(path.join(__dirname, "..", "public", "languages", "en-GB", "company.json"));

module.exports = {
  reviews,
  company,
  common,
};
