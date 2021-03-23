const db = require("../models")
const auth = require('../auth')
const jwt = require('jsonwebtoken');
require('dotenv').config({ silent: true })

const jwt_config = {
    algorithm: "HS256",
    expiresIn: "2h",
};

const jwt_encryption_key = process.env.JWT_ENCRYPTION_KEY

const authCookie = {
    cookie_name: "bazaar6_cookie",
    cookie_config: {
        maxAge: 2 * 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
    }
};

const getUserCredentials = (user) => {
    const token = jwt.sign({ user }, jwt_encryption_key, jwt_config);
    const cookie = { cookie_name: authCookie.cookie_name, cookie_config: authCookie.cookie_config };
    return { token, cookie };
};

module.exports = {
    findAll: function (req, res) {
        db.User
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.User
            .findById({ _id: req.user_id })
            .populate('wishList')
            .populate('products')
            .populate('wantedPosts')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateUser: function (req, res) {
        let toUpdate = req.body
        db.User
            .findOneAndUpdate({ _id: req.user_id }, toUpdate.wishList || toUpdate.products || toUpdate.wantedPosts ? { $addToSet: toUpdate } : toUpdate)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findById({ _id: req.user._id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    createUser: async (req, res) => {
        try {
            const createdUser = await db.User.create({
                ...req.body.user
            });
            const { cookie, token } = getUserCredentials(createdUser);
            res.cookie(cookie.cookie_name, token, { ...cookie.cookie_config });
            res.status(201).send({
                user: { createdUser },
                message: { content: "Successfully created user" },
            });
        } catch (error) {
            res.status(500).send({
                message: {
                    content: "An error occurred creating user",
                    info: error.message,
                },
            });
        }
    },
    login: async (req, res) => {
        try {
            await db.User.findOne({
                email: req.body.user.email
            }, (err, user) => {
                if (!user || !user.validPassword(req.body.user.password)) {
                    res.status(404)
                    res.json({
                        message: {
                            content: "The username or password you entered does not match our records"
                        }
                    })
                    return
                }
                const { cookie, token } = getUserCredentials(user);
                res.cookie(cookie.cookie_name, token, { ...cookie.cookie_config });
                res.status(201).send({
                    user: { user },
                    message: { content: "Successfully logged in" },
                });
            })
        } catch (error) {
            res.status(500).send({
                message: {
                    error: "An error occurred logging in",
                    info: error.message,
                },
            });
        }
    }
}