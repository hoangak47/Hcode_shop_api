const dotenv = require("dotenv");
dotenv.config();

const { MongoClient, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URL;

const db = new MongoClient(uri);

const initDB = async () => {
  try {
    await db.connect();
    return db;
  } catch (err) {
    console.log("err.stack");
  }
};

module.exports = initDB;
