const axios = require("axios");

const MongooseDBModel = require("../Models/MongooseDB.model");

module.exports = {
  getDetailProduct: async (req, res, next) => {
    try {
      const { id } = req.params;

      alert(id);

      console.log(id);

      const url = `https://api-ecom.duthanhduoc.com/products/${id}`;
      let response;
      try {
        response = await axios.get(url);
      } catch (error) {
        error = new Error("Not Found");
        error.status = 404;
        next(error);
      }

      const quantity_product = await MongooseDBModel.findDB(
        { id_product: id },
        "quantityProduct"
      );

      if (quantity_product.length === 0) {
        res.status(200).send(response.data.data);
      } else {
        res.status(200).send({
          ...response.data.data,
          quantity: response.data.data.quantity - quantity_product[0].quantity,
        });
      }
    } catch (error) {
      error = new Error("Not Found");
      error.status = 404;
      next(error);
    }
  },
  getAllProduct: async (req, res, next) => {
    const {
      page,
      category,
      rating_filter,
      price_max,
      price_min,
      sort_by,
      order,
      name,
    } = req.query;
    const url = `https://api-ecom.duthanhduoc.com/products?${
      page ? `page=${page}` : ""
    }&limit=15${category ? `&category=${category}` : ""}${
      rating_filter ? `&rating_filter=${rating_filter}` : ""
    }${price_max ? `&price_max=${price_max}` : ""}${
      price_min ? `&price_min=${price_min}` : ""
    }${name ? `&name=${name}` : ""}${sort_by ? `&sort_by=${sort_by}` : ""}${
      order ? `&order=${order}` : ""
    }`;

    const response = await axios.get(url);

    res.send(response.data.data);
  },
};
