const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    key: "9605bda1274363f8dc16060738b0fa40",
    url:"https://flux.li/android/external/start.php?HWID=eead9669dd311fe9a587a17dd0a95a24a517b1f1a98af5e5f98445b5dc21af265e71cdd358e72423c57cc0e7422f43ca",
    message: "This is supported by triple premium!",
  });
});

module.exports = router;
