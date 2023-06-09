const axios = require("axios");

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const url = `https://api-ecom.duthanhduoc.com/categories`;
      const response = await axios.get(url);
      res.send(response.data.data);
    } catch (error) {
      error = new Error("Not Found");
      error.status = 404;
      next(error);
    }
  },
};
