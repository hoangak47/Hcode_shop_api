const MongooseDBModel = require("../Models/MongooseDB.model");

module.exports = {
  login: async (req, res, next) => {

      const { type, name, email, picture, password, createdAt } = req.body;

      const findUser = await MongooseDBModel.findAllDB("User");
      const user = findUser.find((user) => user.email === email);

      if (type === "google") {
        if (user) {
          if (type === user.type) {
            res.send(user);
          } else {
            res.status(400).send("Email already exists");
          }
        } else {
          await MongooseDBModel.insertDB(
            {
              name: name,
              email: email,
              picture: picture,
              gender: "",
              phone: "",
              address: "",
              createdAt: createdAt,
              type: "google",
            },
            "User"
          );
          const user = await MongooseDBModel.findDB({ email: email }, "User");
          res.status(200).send(user[0]);
        }
        return;
      }
      if (user) {
        if (user.password === password) {
          res.send({
            ...user,
            password: "",
          });
        } else {
          res.status(400).send("Password is wrong");
        }
      } else {
        res.status(400).send("Email is wrong");
      }
    
  },
};
