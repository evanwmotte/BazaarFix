const router = require("express").Router();
const userRoutes = require("./users");
const productRoutes = require("./products");
const wantedRoutes = require("./wanted")

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/wanted", wantedRoutes)

module.exports = router;