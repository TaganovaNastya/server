const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../configs/config.db");

let db;
let ModelCollection;

connectToMongoDB()
    .then(result => {
        db = result;
        ModelCollection = db.collection("Model");
    })
    .catch(err => {
    throw err;
    })

    async function GetModels() {
        try {
            const model = await ModelCollection.find().project({modelName: 1, _id: 1});
            return model.toArray();
        }
        catch (err) {
        throw err;
        }
    }

    async function GetModelID(modelId) {
        try {
        return await ModelCollection.findOne({_id: new ObjectId(modelId)});
        }
        catch (err) {
        throw err;
        }
    }
    
    async function AddModel(modelData) {
        try {
        return ModelCollection.insertOne(modelData);
        }
        catch (err) {
        throw err;
        }
    }
    
    async function UpdateModel(modelId, modelData) {
        try {
            return await ModelCollection.updateOne({_id: new ObjectId(modelId)}, {
            $set: modelData
            });
        }
        catch (err) {
        throw err;
        }
    }
    
    async function DeleteModel(modelId) {
        try {
        return await ModelCollection.deleteOne({_id: new ObjectId(modelId)});
        }
        catch (err) {
        throw err;
        }
    }
    
    module.exports = {
        GetModels,
        GetModelID,
        AddModel,
        UpdateModel,
        DeleteModel
    }
