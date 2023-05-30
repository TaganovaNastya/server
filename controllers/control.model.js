const modelsService = require("../services/service.model");
const { ObjectId } = require("mongodb");


async function GetModels(req, res, next) {
    try {
        const model = await modelsService.GetModels();
        res.send(model);
    }
    catch (err) {
        next(err);
    }
}

async function GetModelID(req, res, next) {
    const modelId = req.params.id;

    if (!ObjectId.isValid(modelId)) {
        const err = new Error("Не валидный ID модели");
        next(err);
    }

    try {
        const model = await modelsService.GetModelID(modelId);
        res.send(model);
    }
    catch (err) {
        next(err)
    }
}

function validateModelData(CustomData) {
    let err = null;

    if (!CustomData) {
        err = new Error("Данные не получены");
    }
    if (!CustomData.userName || typeof CustomData.userName !== "string") {
        err = new Error("Ожидалось имя пользователя");
    }
    if (!CustomData.modelName || typeof CustomData.modelName !== "string") {
        err = new Error("Ожидалось имя модели");
    }
    if (!CustomData.modelType || typeof CustomData.modelType !== "object") {
        err = new Error("Ожидался тип модели");
    }
    if (CustomData.description && typeof CustomData.description !== "string") {
        err = new Error("Ожидалось описание");
    }
    if (CustomData.comments && typeof CustomData.comments !== "object") {
        err = new Error("Ожидалось комментарии");
    }

    return err;
}


async function AddModel(req, res, next) {
    const CustomData = req.body;

    const error = validateModelData(CustomData);
    if (error !== null) {
        res.statusCode = 400;
        next(error);
    }

    const insertModelData = {...CustomData};
    insertModelData.description = insertModelData.description;
    insertModelData.comments = insertModelData.comments;

    const date = new Date();
    insertModelData.created = date;
    insertModelData.modified = date;

    try {
        const insertRes = await modelsService.AddModel(insertModelData);

        if (insertRes.insertedId) {
            res.statusCode = 201;
            res.send(insertRes.insertedId);
            
            
        }
        else {
            const err = new Error("Ошибка при добавлении модели");
            res.statusCode = 500;
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
}

async function UpdateModel(req, res, next) {
    const CustomData = req.body;

    if (!CustomData) {
        res.statusCode = 400;
        const err = new Error("Данных нет");
        next(err);
    }

    const modelId = req.params.id;

    if (!modelId || !ObjectId.isValid(modelId)) {
        res.statusCode = 400;
        const err = new Error("Не валидный ID модели");
        next(err);
    }

    const error = validateModelData(CustomData);
    if (error !== null) {
        next(error);
    }

    const insertModelData = {...CustomData};

    insertModelData.modified = new Date();

    try {
        const result = await modelsService.UpdateModel(modelId, insertModelData);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
}

async function DeleteModelID(req, res, next) {
    const modelId = req.params.id;
    
    if (!ObjectId.isValid(modelId)) {
    const err = new Error("Не валидный ID модели");
    res.statusCode = 400;
    next(err);
    }
    
    try {
    const result = await modelsService.DeleteModel(modelId);
    
    if (result.deletedCount !== 1) {
    const err = new Error("Ничего не удалено");
    res.statusCode = 500;
    next(err);
    } else {
    res.sendStatus(204);
    }
    } catch (err) {
    next(err);
    }
    }
    

module.exports = {
    GetModels,
    GetModelID,
    AddModel,
    UpdateModel,
    DeleteModelID
}