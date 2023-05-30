// const { ObjectId } = require("mongodb");
// const connectToMongoDB = require("../config.db");

// let db;

// connectToMongoDB()
//   .then((result) => {
//     db = result;
//   })
//   .catch((err) => console.log(err));

// console.log(db);

// async function insertComment(data) {
//   const comments = db.collection("");
//   await comments.insertOne(data);
//   //return pos;
// }

// async function findComments() {
//   const comments = db.collection("comments");
//   const result = await comments.find();
//   return result.toArray();
// }

// async function findComment(id) {
//   const comments = db.collection("comments");
//   const result = await comments.findOne({ _id: new ObjectId(id) });
//   return result;
// }

// module.exports = {
//   insertComment,
//   findComments,
//   findComment,
// };







