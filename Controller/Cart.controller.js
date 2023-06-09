const { ObjectId } = require("mongodb");
const MongooseDBModel = require("../Models/MongooseDB.model");

module.exports = {
  getCart: async (req, res, next) => {
    try {
      const { id } = req.query;

      const cart = await MongooseDBModel.findDB({ id_user: id }, "Carts", {
        createdAt: -1,
      });

      if (cart) {
        res.status(200).send(cart);
      } else {
        res.send([]);
      }
    } catch (error) {
      res.send([]);
    }
  },
  addToCart: async (req, res, next) => {
    try {
      const { id_user, id_product, quantity } = req.body;

      const findCartUser = await MongooseDBModel.findDB(
        { id_user: id_user, id_product: id_product },
        "Carts"
      );

      const quantityProduct = await MongooseDBModel.findDB(
        { id_product: id_product },
        "quantityProduct"
      );
      if (quantityProduct.length === 0) {
        await MongooseDBModel.insertDB(
          {
            ...req.body,
          },
          "Carts"
        );

        await MongooseDBModel.insertDB(
          {
            id_product: id_product,
            quantity: quantity,
          },
          "quantityProduct"
        );

        res.status(200).send({
          message: "Add to cart successfully",
        });
      } else {
        if (findCartUser.length === 0) {
          const quantity_ = quantityProduct[0].quantity + quantity;
          await MongooseDBModel.insertDB(
            {
              ...req.body,
            },
            "Carts"
          );

          await MongooseDBModel.updateDB(
            { id_product: id_product },
            {
              quantity: quantity_,
            },
            "quantityProduct"
          );

          res.status(200).send({
            message: "Add to cart successfully",
          });
        } else {
          const quantity_ = quantityProduct[0].quantity + quantity;
          if (quantity_ > req.body.quantityProduct) {
            res.status(400).send({
              message: "Quantity is not enough",
            });
            return;
          }

          await MongooseDBModel.updateDB(
            { id_user: id_user, id_product: id_product },
            {
              quantity: quantity_,
            },
            "Carts"
          );

          await MongooseDBModel.updateDB(
            { id_product: id_product },
            {
              quantity: quantity_,
            },
            "quantityProduct"
          );

          res.status(200).send({
            message: "Add to cart successfully",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  },
  deleteCart: async (req, res, next) => {
    const { id } = req.params;
    const { id_product, quantity } = req.body;
    try {
      const quantityProduct = await MongooseDBModel.findDB(
        {
          id_product: id_product,
        },
        "quantityProduct"
      );

      await MongooseDBModel.updateDB(
        { id_product: id_product },
        {
          quantity: quantityProduct[0].quantity - quantity,
        },
        "quantityProduct"
      );

      await MongooseDBModel.deleteDB({ _id: new ObjectId(id) }, "Carts");

      res.status(200).send({
        message: "Delete cart successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  updateCart: async (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;

    const cart = await MongooseDBModel.findDB(
      {
        _id: new ObjectId(id),
      },
      "Carts"
    );

    const quantityProduct = await MongooseDBModel.findDB(
      {
        id_product: cart[0].id_product,
      },
      "quantityProduct"
    );

    if (
      quantity > cart[0].quantityProduct ||
      quantityProduct[0].quantity > cart[0].quantityProduct
    ) {
      res.status(400).send({
        message: "Quantity is not enough",
      });
      return;
    }

    await MongooseDBModel.updateDB(
      { _id: new ObjectId(id) },
      {
        quantity: quantity,
      },
      "Carts"
    );

    if (quantity > cart[0].quantity) {
      await MongooseDBModel.updateDB(
        { id_product: cart[0].id_product },
        {
          quantity: quantityProduct[0].quantity + (quantity - cart[0].quantity),
        },
        "quantityProduct"
      );
    } else {
      await MongooseDBModel.updateDB(
        { id_product: cart[0].id_product },
        {
          quantity: quantityProduct[0].quantity - (cart[0].quantity - quantity),
        },
        "quantityProduct"
      );
    }

    res.status(200).send({
      message: "Update cart successfully",
    });
  },
};
