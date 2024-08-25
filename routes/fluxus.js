const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    message: "Api is currently private for now!",
  });
});

module.exports = router;
