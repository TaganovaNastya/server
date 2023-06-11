const apiKeyServices = require("../services/service.api");

async function GetApi(req, res, next) {
    const {userName} = req.body;

    if (!userName) {
        res.statusCode = 400;
        const err = new Error("Нет имени");
        next(err);
    }

    if (typeof userName !== "string") {
        res.statusCode = 400;
        const err = new Error("Ожидалось тип \"string\"");
        next(err);
    }

    try {
        const apiKey = await apiKeyServices.GetApi(userName)
        res.json(apiKey);
    }
    catch (err) {
        res.statusCode = 500;
        next(err);
    }
}

async function DeleteApi(req, res, next) {
    const apiKey = req.headers.apikey;

    if (!apiKey) {
        const err = new Error("Не передан API ключ");
        res.statusCode = 401;
       next(err);
    }
    else {
        try {
            const deletedApiKey = await apiKeyServices.DeleteApi(apiKey);
            res.json(deletedApiKey);
        }
        catch (err) {
            res.statusCode = 500;
            next(err);
        }
    }
}

function CheckApi(req, res, next) {
    const apiKey = req.headers.apikey;

    if (!apiKey) {
        const err = new Error("Не передан ключ API");
        res.statusCode = 401;
        next(err);
    }
    else {
        next();
    }
}



module.exports = {
    DeleteApi,
    GetApi,
    CheckApi
}