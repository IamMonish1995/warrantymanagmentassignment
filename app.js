const express = require("express");
const warrantyRoutes = require("./routes/warrantyRoutes");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Warranty Items API",
      version: "1.0.0",
      description: "API documentation for Warranty Items using Swagger",
    },
    servers: [
      { url: "https://warantyapi.pictureai.in" },
      { url: "http://localhost" + ":" + PORT },
      { url: "http://13.126.188.121" + ":" + PORT },
    ],
  },
  apis: ["./routes/*.js"],
};

// Initialize Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", warrantyRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
