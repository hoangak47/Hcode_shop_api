const MongooseDBModel = require("../Models/MongooseDB.model");

module.exports = {
  register: async (req, res, next) => {
    const {
      name,
      email,
      password,
      picture = "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
    } = req.body;

    const findAllDB = await MongooseDBModel.findAllDB("User");

    const user = findAllDB.find((user) => user.email === email);
    if (!name || !email || !password) {
      res.status(400).send("Please fill all the fields");
      return;
    }
    if (user) {
      res.status(400).send("Email already exists");
    } else {
      await MongooseDBModel.insertDB(
        {
          name: name,
          email: email,
          password: password,
          picture: picture,
          gender: "",
          phone: "",
          address: "",
          createdAt: new Date(),
        },
        "User"
      );
      res
        .status(200)
        .send(await MongooseDBModel.findDB({ email: email }, "User"));
    }
  },
};
