const express = require("express");

const app = express();

const port = process.env.PORT || 5000; //run on port 5000 until we deploy

app.listen(port, () => console.log(`Server running on port ${port}`));
