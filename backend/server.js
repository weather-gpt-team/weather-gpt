const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("WeatherGPT Backend is Running!");
});


app.get("/weather", async (req, res) => {

    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            message: "City is required"
        });
    }

    try {

        const response = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather",
            {
                params: {
                    q: city,
                    appid: process.env.WEATHER_API_KEY,
                    units: "metric"
                }
            }
        );

        const data = response.data;

        res.json({
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            condition: data.weather[0].description
        });

    } catch (error) {

        console.error(error.response ? error.response.data : error.message);

        res.status(500).json({
            message: "Weather data not found"
        });

    }

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
