const express = require("express");
const app = express();
const catMe = require("cat-me");

app.listen(5000, () => {
    console.log("Server is istening on port 5000!")
    console.log(catMe("nyan"));
})