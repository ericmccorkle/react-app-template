//importing express
const express = require("express");
const app = express();
const PORT = 3000;

//Routers
const apiRouter = require("./routes/apiRouter.js");

//parsing Cookies
const cookieParser = require("cookie-parser");

//Allows server to process incoming JSON, form data into the req.body, cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//when the path is /api, go into the apiRouter.js in routes folder
app.use("/api", apiRouter);

//When the client makes a GET request to homepage, send back the index.html
app.get("/", (req, res) => {
  return res.end("/");
});

//404 NOT FOUND, unknown path handler
app.use((req, res) => {
  return res.end("not a valid path");
});

//Global Error Handler, refer to errorCodes.js in utils to give err meaning
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//server will listen to specified PORT
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
