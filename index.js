// Import packages
const express = require("express");
const fluxus = require("./routes/fluxus");
const delta = require("./routes/delta");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/fluxus", fluxus);
app.use("/delta", delta);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
