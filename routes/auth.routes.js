const router = require("express").Router();

// Dynamic Imports
const auth = require("../controllers/auth.controllers");
const { validateRegister } = require("../utils/validate.utils");

router.post("/signup", validateRegister, auth.signUp);
router.post("/login", auth.signIn);
// router.get("/logout", auth.signOut);
// router.post("/reset", auth.resetPassword);

module.exports = router;
