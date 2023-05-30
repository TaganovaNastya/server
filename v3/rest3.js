const express = require("express");
const router= express.Router();
router.use(express.json());
const bodyParser = require('body-parser');


const controlApi = require("../controllers/control.api");
const controlModel = require("../controllers/control.model");



router.post("/API", controlApi.GetApi);
router.delete("/API", controlApi.DeleteApi);

router.post("/Model", controlApi.CheckApi, controlModel.AddModel);
router.put("/Model/:id", controlApi.CheckApi, controlModel.UpdateModel);

router.get("/Models", controlModel.GetModels);
router.get("/Model/:id", controlModel.GetModelID);
router.delete("/Model/:id", controlApi.CheckApi, controlModel.DeleteModelID);


module.exports = router;