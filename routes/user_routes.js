const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user_controller");
const Form_controller = require("../controllers/Form_controller");
const auth = require("../middleware/auth_middleware");

router.get("/", user_controller.showUsers);

router.get("/users", auth.verifyToken, user_controller.showUsers);

router.get("/add", user_controller.showForm);

router.post("/users", auth.verifyToken, user_controller.addUser);

router.get("/users/:id", auth.verifyToken, user_controller.editUser);

router.put("/users/:id", auth.verifyToken, user_controller.updateUser);

router.get("/login", user_controller.loginPage);

router.post("/login", user_controller.loginUser);

router.get("/logout", auth.verifyToken, user_controller.logout);

router.get("/form", Form_controller.viewUsers);

module.exports = router;


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetch all users (requires token)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", auth.verifyToken, user_controller.showUsers);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", user_controller.loginUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 */
router.get("/users/:id", auth.verifyToken, user_controller.editUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/users/:id", auth.verifyToken, user_controller.updateUser);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get("/logout", auth.verifyToken, user_controller.logout);




// router.get("/home", (req, res) => {
//   res.send("<h2>Home Page test done succesful</h2>");
// });v


//Change in commit