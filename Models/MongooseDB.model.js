module.exports = {
  findAllDB: async (table) => {
    const db = await require("../initDB")();
    return await db.db().collection(table).find({}).toArray();
  },
  findDB: async (query, table, sort = null) => {
    const db = await require("../initDB")();
    return await db.db().collection(table).find(query).sort(sort).toArray();
  },
  updateDB: async (query, data, table) => {
    const db = await require("../initDB")();
    await db.db().collection(table).updateOne(query, {
      $set: data,
    });
  },
  insertDB: async (data, table) => {
    const db = await require("../initDB")();
    await db.db().collection(table).insertOne(data);
  },
  deleteDB: async (query, table) => {
    const db = await require("../initDB")();
    console.log(query);
    await db.db().collection(table).deleteOne(query);
  },
};
