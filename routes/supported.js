const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    supported: "Fluxus
      Delta
      Relz!",
  });
});

module.exports = router;
