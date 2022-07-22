const API_KEY = process.env;

const { Dog, Temperament } = require("../db");

const axios = require("axios");

const API = async () => {
  const URL = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  try {
    const Doge = await URL.data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        height: dog?.height?.metric,
        weight: dog?.weight?.metric,
        lifespan: dog?.life_span,
        temperaments: dog?.temperament?.split(/\s*,\s*/),
        image: dog?.image.url,
      };
    });
    return Doge;
  } catch (error) {
    console.log(error);
  }
};
const dawgDB = async () => {
  const service = await Dog.findAll({ include: Temperament });
  return service;
};
const allInfo = async () => {
  const api = await API();
  const byDB = await dawgDB();
  const fused = api.concat(byDB);
  return fused;
};
module.exports = { allInfo };
