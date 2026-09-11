const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("WeatherGPT Backend is Running!");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
