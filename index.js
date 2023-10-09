const express = require("express");
const fs = require("fs");
const PORT = 8000;

const app = express();

app.get("/", (req, res) => {
    try {
        let dateTime = new Date();
        let formattedDateTime = dateTime.toISOString().replace(/[:.]/g, '-');

        fs.writeFileSync(`DateTime-${formattedDateTime}`, dateTime.toString());

        let data = fs.readFileSync(`DateTime-${formattedDateTime}`, 'utf8');

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }});
app.listen(PORT, () => console.log(`Server Listening to ${PORT}`));