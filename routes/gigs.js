const express = require("express");
const router = express.Router();
const {
  get_gigs,
  create_table,
  insert_gigs,
  search_gig,
} = require("../models/Gig");

// Get gig list
router.get("/", async (req, res) => {
  try {
    let gigs = await get_gigs();
    console.log(gigs);
    res.render("gigs", {
      gigs,
    });
  } catch (error) {
    console.log(error);
    res.render("gigs", {
      gigs: [],
    });
  }
});

// Display add gig form
router.get("/add", (req, res) => res.render("add"));

// Add a gig
router.post("/add", async (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!technologies) {
    errors.push({ text: "Please add some technologies" });
  }
  if (!description) {
    errors.push({ text: "Please add a description" });
  }
  if (!contact_email) {
    errors.push({ text: "Please add a contact email" });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  } else {
    if (!budget) {
      budget = "Unknown";
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ",");

    let data = await insert_gigs({
      title,
      technologies,
      description,
      budget,
      contact_email,
    });
    console.log("data called", data);
    res.redirect("/gigs");
  }
});

// Search for gigs
router.get("/search", async (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  let gigs = await search_gig(term);
  res.render("gigs", { gigs });
});

router.get("/createtable", async (req, res) => {
  console.log("createtable/test");
  let data = await create_table();
  res.json({ message: "ok", data });
});

module.exports = router;
