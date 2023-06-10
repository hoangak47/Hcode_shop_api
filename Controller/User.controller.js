const MongooseDBModel = require("../Models/MongooseDB.model");
const { ObjectId } = require("mongodb");

module.exports = {
  updateUserInfo: async (req, res, next) => {
      const findUser = await MongooseDBModel.findDB(
        {
          _id: new ObjectId(req.body.id),
        },
        "User"
      );

      if (findUser.length > 0) {
        await MongooseDBModel.updateDB(
          { _id: new ObjectId(req.body.id) },
          {
            name: req.body.name,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address,
          },
          "User"
        );

        res.send(
          await MongooseDBModel.findDB(
            {
              _id: new ObjectId(req.body.id),
            },
            "User"
          )
        );
      }
    
  },
  changePassword: async (req, res, next) => {
      const findUser = await MongooseDBModel.findDB(
        {
          _id: new ObjectId(req.body.id),
        },
        "User"
      );

      const user = findUser.find((user) => user.password === req.body.password);

      if (user) {
        await MongooseDBModel.updateDB(
          { _id: new ObjectId(req.body.id) },
          {
            password: req.body.newPassword,
          },
          "User"
        );

        res.send("Change password successfully");
      } else {
        res.send("Wrong password");
      }
    
  },
};
