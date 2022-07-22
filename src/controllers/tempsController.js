const axios = require("axios");
const { API_KEY } = process.env;

const tempAPI = async () => {
  const URL = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  try {
    const tempsUn = await URL.data
      .map((t) => t.temperament?.split(/\s*,\s*/))
      .flat();
    const [...temps] = new Set(tempsUn);
    return temps.filter(Boolean).map((e) => ({
      name: e,
    }));
  } catch (err) {
    console.log("TEMP ERR", err);
  }
};

module.exports = { tempAPI };
