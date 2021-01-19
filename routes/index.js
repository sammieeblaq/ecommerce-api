const router = require("express").Router();
// const { auth } = require("../middleware/authorization");

// router.get("/", (req, res) => res.redirect("/accounts"));

router.use("/", require("./auth.routes"));

module.exports = router;
