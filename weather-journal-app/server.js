// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// const fetch = require("node-fetch"); => error, not supported
import fetch from "node-fetch";

// after changing everything to "import", it throws
// "localhost:8000 not found" 404

// Express to run server and routes
import express from "express";

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
import bodyParser from "body-parser";
import cors from "cors";

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Callback to debug
const listening = () => console.log(`server running on port ${port}`);

// Spin up the server
const port = 8000;
const server = app.listen(port, listening);

// Callback function to complete GET '/all' ????
const getData = (request, response) => response.send("test");
// if we switch to /all "test" is displayed

// Initialize all route with a callback function
app.get("/all", getData);

const postData = (request, response) => {
  let data = request.body;
  //projectData["myData"] = data.myData;
};

// Post Route
app.post("/all", postData);
