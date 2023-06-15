const express = require("express")
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const restApi = require('./v3/rest3');

const app = express();
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors')

app.use(logger("dev"));
app.use(helmet());
app.use(cors())

app.use(express.static('public'))
app.use('/v3', restApi);



app.use((err, req, res, next)=>{
        console.error("Произошла ошибка:", err);
        res.end();
        return;
        // res.status(400);
        // res.json({
        //         status:"Error",
        //         message: "Bad requare",
        // });
})

const bodyParser = require('body-parser');

const swaggerDefinition = {
        openapi: "3.0.0",
        info: {
          title: "Express API Hello world",
          version: "1.0.0",
          description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        tags:{
          name: "Api",
          description: "Get, generate or delete your API token",
          name: "Models",
          description: "Get all, get by id, add new, update or delete 3D model",
        },
        components: {
          securitySchemes: {
            apikey: {
              type: "apiKey",
              name: "apikey",
              in: "header",
            },
          },
        },
        servers: [
          {
            url: "http://127.0.0.1:5500/v3",
            description: "Локальный для разработки",
          },
        ],
      };
      

const options = {
        swaggerDefinition,
        apis: ["./v3/*.js"], // из каких файлов забираем JSDoc @swagger
      };
      
      const swaggerSpec = swaggerJSDoc(options);
      
      app.use("/v3", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(5500, '127.0.0.1', ()=>{
        console.log("server is running http://127.0.0.1:5500/");
})