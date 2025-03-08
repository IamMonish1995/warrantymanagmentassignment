const express = require("express");
const warrantyRoutes = require("./routes/warrantyRoutes");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "http://localhost";

// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Warranty Items API",
      version: "1.0.0",
      description: "API documentation for Warranty Items using Swagger",
    },
    servers: [{ url: HOST + ":" + PORT }],
  },
  apis: ["./routes/*.js"],
};

// Initialize Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", warrantyRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
