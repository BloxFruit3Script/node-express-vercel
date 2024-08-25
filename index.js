// Import packages
const express = require("express");
const fluxus = require("./routes/fluxus");
const delta = require("./routes/delta");
const relz = require("./routes/relz");
const supported = require("./routes/supported");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/fluxus", fluxus);
app.use("/delta", delta);
app.use("/relz", relz);
app.use("/supported", supported);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
