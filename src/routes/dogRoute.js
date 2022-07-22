const { Router } = require("express");
const { Sequelize } = require("sequelize");
const { allInfo } = require("../controllers/dogsController");
const { Dog, Temperament } = require("../db");
const router = Router();

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  const info = await allInfo();
  try {
    if (name) {
      const breed = await info.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      breed.length
        ? res.status(200).send(breed)
        : res.status(404).send("Sorry, not a dawg");
    } else {
      res.status(200).json(info);
    }
  } catch (err) {
    res.status(500);
    console.log("routerdog err", err);
  }
});
router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  const dogs = await allInfo();
  try {
    const dogViaId = await dogs.find((d) => `${d.id}` === id);
    if (id.includes("-")) {
      const dbDawg = await Dog.findByPk(id, {
        include: [
          {
            model: Temperament,
            as: "temperaments",
            through: { attributes: [] },
          },
        ],
      });
      dbDawg
        ? res.status(200).json(dbDawg)
        : res.status(404).send("NOT A DAWG ID");
    } else {
      res.status(200).json(dogViaId);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log("dogsId", err);
  }
});
router.post("/dogs", async (req, res) => {
  const {
    name,
    height,
    weight,
    lifespan,
    image,
    temperaments,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
  } = req.body;
  try {
    const dogNew = await Dog.create({
      name,
      height: heightMin + " - " + heightMax,
      weight: weightMin + " - " + weightMax,
      lifespan: lifespan + " years",
      image,
    });
    const tempDB = await Temperament.findAll({
      where: { name: temperaments },
    });
    await dogNew.addTemperament(tempDB);
    res.status(201).json(dogNew);
    console.log(dogNew);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});
router.get("/dogs/:id/delete", async (req, res) => {
  try {
    await Dog.destroy({
      where: { id: req.params.id },
    });
    return res.status(204).json({ msg: "Dog deleted" });
  } catch (err) {
    res.status(500).send(error);
    console.log(err);
  }
});

module.exports = router;
