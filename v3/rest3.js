const express = require("express");
const router= express.Router();
router.use(express.json());
const bodyParser = require('body-parser');


const controlApi = require("../controllers/control.api");
const controlModel = require("../controllers/control.model");



  
/**
 * @swagger
 * /API:
 *   post:
 *     tags:
 *       - API
 *     summary: Get API Key
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiKey:
 *                   type: string
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 * 
 * */

router.post("/API", controlApi.GetApi);

/**
 * @swagger
 * /API:
 *   delete:
 *     tags:
 *       - API
 *     summary: Delete API Key
 *     security:
 *       - apikey: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedApiKey:
 *                   type: string
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *
 * 
 * */


router.delete("/API", controlApi.DeleteApi);

/**
 * @swagger
 * /Model:
 *   post:
 *     tags:
 *       - Model
 *     summary: Add Model
 *     security:
 *       - apikey: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: User name
 *               modelName:
 *                 type: string
 *                 description: Model name
 *               modelType:
 *                 type: object
 *                 description: Model type
 *               description:
 *                 type: string
 *                 description: Description (optional)
 *               comments:
 *                 type: object
 *                 description: Comments (optional)
 *             required:
 *               - userName
 *               - modelName
 *               - modelType  
 *     responses:
 *        '201':
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                description: ID of the inserted model
 *        '400':
 *          description: Bad Request
 *        '401':
 *         description: Unauthorized
 *        '500':
 *          description: Internal server error
 *
 *
 * 
 * */


router.post("/Model", controlApi.CheckApi, controlModel.AddModel);

/**
 * @swagger
 * /Model/{id}:
 *   put:
 *     tags:
 *       - Model
 *     summary: Update model by id
 *     security:
 *       - apikey: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: User name
 *               modelName:
 *                 type: string
 *                 description: Model name
 *               modelType:
 *                 type: object
 *                 description: Model type
 *               description:
 *                 type: string
 *                 description: Description (optional)
 *               comments:
 *                 type: object
 *                 description: Comments (optional)
 *             required:
 *               - userName
 *               - modelName
 *               - modelType  
 *     responses:
 *        '200':
 *          description: Update
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                description: ID of the inserted model
 *        '400':
 *          description: Bad Request
 *        '401':
 *         description: Unauthorized
 *        '500':
 *          description: Internal server error
 *
 *
 * 
 * */

router.put("/Model/:id", controlApi.CheckApi, controlModel.UpdateModel);

/**
 * @swagger
 * /Model:
 *   get:
 *     tags:
 *       - Model
 *     summary: Get Models
 *     responses:
 *        '200':
 *          description: Models
 *        '500':
 *          description: Internal server error
 *
 *
 * 
 * */

router.get("/Model", controlModel.GetModels);

/**
 * @swagger
 * /Model/{id}:
 *   get:
 *     tags:
 *       - Model
 *     summary: Get model by id
 *     description: Get model by id
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: valid ID
 *     responses:
 *        '200':
 *          description: Model
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userName:
 *                    type: string
 *                    description: User name
 *                  modelName:
 *                    type: string
 *                    description: Model name
 *                  modelType:
 *                    type: object
 *                    description: Model type
 *                  description:
 *                    type: string
 *                    description: Description (optional)
 *                  comments:
 *                    type: object
 *                    description: Comments (optional)
 *              
 *        '400':
 *          description: Bad Request
 *        '401':
 *         description: Unauthorized
 *        '500':
 *          description: Internal server error
 *
 *
 * 
 * */

router.get("/Model/:id", controlModel.GetModelID);

/**
 * @swagger
 * /Model/{id}:
 *   delete:
 *     tags:
 *       - Model
 *     summary: Delete model by id
 *     security:
 *       - apikey: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *     responses:
 *        '204':
 *          description:
 *        '400':
 *          description: Bad Request
 *        '401':
 *         description: Unauthorized
 *        '500':
 *          description: Internal server error
 *
 *
 * 
 * */

router.delete("/Model/:id", controlApi.CheckApi, controlModel.DeleteModelID);


module.exports = router;