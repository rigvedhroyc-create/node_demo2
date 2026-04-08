const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

// ✅ Swagger imports
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const userRoutes = require("./routes/user_routes");

const app = express();


// ✅ 👉 PUT SWAGGER CONFIG HERE
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);


// ✅ Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "mysecretkey",
  resave: false,
  saveUninitialized: true
}));

// Prevent cache
app.use((req, res, next) => {
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.header("Pragma", "no-cache");
  res.header("Expires", "0");
  next();
});


// ✅ Swagger route (VERY IMPORTANT)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ✅ Your routes
app.use("/", userRoutes);


// ✅ Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Swagger: http://localhost:3000/swagger");
});

// Test Commit

Added api test 
