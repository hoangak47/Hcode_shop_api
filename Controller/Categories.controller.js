const axios = require("axios");

module.exports = {
  getAllCategories: async (req, res, next) => {
    
    const url = `https://api-ecom.duthanhduoc.com/categories`;
    const response = await axios.get(url);
    res.send(response.data.data);
  },
};
