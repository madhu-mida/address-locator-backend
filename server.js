const express = require("express");
const app = express();
require("dotenv").config();
const { PORT = 3001 } = process.env;
const axios = require('axios');

const cors = require("cors");
const morgan = require("morgan");

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json());


// Routes
app.get("/", (req, res) => {
    res.send("Address Locator");
})

app.post("/getDetailsForAddress", async (req, res) => {
    try {
        let data = req.body
        console.log("DATA", data)
        if (data) {
            const apiURL = `https://geocoding.geo.census.gov/geocoder/locations/address?street=${data.address}&city=${data.city}&state=${data.state}&zip=${data.zip}&benchmark=2020&format=json`;
            console.log("APIURL", apiURL)
            let result = await axios.get(apiURL).then(resp => {
                res.status(200).json(resp.data)

            })
                .catch(err => {
                    res.status(400).json(err)
                })

        }
    } catch (error) {
        console.log("ERROR :: ", error)
        res.status(400).json(error)
    }
})


// Listener
app.listen(PORT, () => {
    console.log(`You are listening to ${PORT}`)
})