const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../configs/config.db");

const { v4: uuidv4 } = require('uuid');

let db;
let APICollection;

connectToMongoDB()
    .then(result => {
        db = result;
        APICollection = db.collection("API")
    })
    .catch(err => console.log(err))

async function GetApi(userName) {
    try {
        let apiKeyDoc;

        apiKeyDoc = await APICollection.findOne({user: userName});

        if (apiKeyDoc === null) {
            const insertRes = await APICollection.insertOne({
                user: userName,
                apiKey: uuidv4(),
            });

            if (insertRes.insertedId) {
                apiKeyDoc = await APICollection.findOne({_id: new ObjectId(insertRes.insertedId)});
            }
        }

        return apiKeyDoc;
    }

    catch (err) {
        throw err;
    }
}
async function DeleteApi(apiKey) {
    try {
        return await APICollection.findOneAndDelete({"apiKey": apiKey});
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    GetApi,
    DeleteApi
}