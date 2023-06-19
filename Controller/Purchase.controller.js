const { ObjectId } = require("mongodb");
const MongooseDBModel = require("../Models/MongooseDB.model");

module.exports = {
  findAll: async (req, res, next) => {
    const { id, type } = req.query;

    let findPurchaseUser = [];

    if (parseInt(type) === 0) {
      findPurchaseUser = await MongooseDBModel.findDB(
        { id_user: id },
        "PurchaseOrders",
        { updatedAt: -1 }
      );
    } else {
      findPurchaseUser = await MongooseDBModel.findDB(
        { id_user: id, type: parseInt(type) },
        "PurchaseOrders",
        { updatedAt: -1 }
      );
    }

    console.log(findPurchaseUser);
    if (findPurchaseUser) {
      res.status(200).send(findPurchaseUser);
    } else {
      res.send([]);
    }
  },
  create: async (req, res, next) => {
    const {
      id_user,
      createdAt,
      totalQuantity,
      type,
      orderProduct,
      name,
      phone,
      address,
      email,
      message,
      updatedAt,
    } = req.body;

    await MongooseDBModel.insertDB(
      {
        id_user: id_user,
        createdAt: createdAt,
        updatedAt: updatedAt,
        totalQuantity: totalQuantity,
        name: name,
        phone: phone,
        address: address,
        email: email,
        message: message,
        type: type,
        orderProduct: orderProduct,
      },
      "PurchaseOrders"
    );

    orderProduct.forEach(async (product) => {
      const { id_product } = product;

      const cart = await MongooseDBModel.findDB(
        { id_user: id_user, id_product: id_product },
        "Carts"
      );

      if (cart) {
        await MongooseDBModel.deleteDB(
          { id_user: id_user, id_product: id_product },
          "Carts"
        );
      }
    });

    res.status(200).send({
      message: "Success",
    });
  },
  findOne: async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("id is required");
      return;
    }

    const purchaseOrders = await MongooseDBModel.findDB(
      { _id: new ObjectId(id) },
      "PurchaseOrders"
    );
    console.log(purchaseOrders);

    if (purchaseOrders.length > 0) {
      res.status(200).send(purchaseOrders);
    } else {
      res.send([]);
    }
  },
  cancel: async (req, res, next) => {
    const { id } = req.params;
    const { type } = req.body;

    await MongooseDBModel.updateDB(
      { _id: new ObjectId(id) },
      { type: type, updatedAt: new Date() },
      "PurchaseOrders"
    );

    const data = await MongooseDBModel.findDB(
      { _id: new ObjectId(id) },
      "PurchaseOrders"
    );

    data[0].orderProduct.forEach(async (product) => {
      const { id_product, quantity } = product;

      const products = await MongooseDBModel.findDB(
        { id_product: id_product },
        "quantityProduct"
      );

      await MongooseDBModel.updateDB(
        { id_product: id_product },
        {
          quantity: products[0].quantity - quantity,
        },
        "quantityProduct"
      );
    });

    res.status(200).send({
      message: "Success",
    });
  },
};
