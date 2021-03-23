const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/")
    .get(userController.findById)
    .put(userController.updateUser)

router.route("/:id")
    .get(userController.findById)
    .delete(userController.remove);

router.route('/signup')
    .post(userController.createUser)

router.route('/login')
    .post(userController.login)

module.exports = router;