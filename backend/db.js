const mongoose = require("mongoose");

const url = `mongodb+srv://irtaza009:irtaza009@cluster0.zops4jh.mongodb.net/foodhutlocal?retryWrites=true&w=majority&appName=Cluster0`;

const connection_db = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

    // const db = mongoose.connection.db;
    // const collection = db.collection("food_items");
    // const cursor = await collection.find({});
    // const arr = new Array();
    // await cursor.forEach((document) => {
    //   arr.push(document);
    // });
    // global.food_items = arr;

    // const foodCategoryCollection = await db.collection("food_categories");
    // const foodCategory = await foodCategoryCollection.find({});
    // const arr2 = new Array();
    // await foodCategory.forEach((document) => {
    //   arr2.push(document);
    // });
    // global.food_category = arr2;
    // // console.log(global.food_items)
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connection_db;
