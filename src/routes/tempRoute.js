const { Router } = require("express");
const { tempAPI } = require("../controllers/tempsController");
const router = Router();
const { Temperament } = require("../db");

router.get("/temperaments", async (req, res) => {
  const temps = await tempAPI();
  let allTemps = await Temperament.findAll();
  try {
    if (allTemps.length === 0) {
      await Temperament.bulkCreate(temps);
      res.status(201).send("Temperaments CREATED");
    } else {
      res.status(200).json(allTemps);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
