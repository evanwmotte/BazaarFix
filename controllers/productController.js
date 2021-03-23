const db = require("../models")

module.exports = {
    findAll: function (req, res) {
        db.Product
            .find({})
            .sort({ category: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Product
            .findById({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    postProduct: function (req, res) {
        try {
            db.Product
                .create(req.body)
                .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.user_id }, { $addToSet: { products: _id } }))
                .then(res.status(201).send({
                    message: { content: "Product Posted" }
                }))
                .then(dbModel => res.json(dbModel))
        } catch (err) {
            res.status(500).send({
                message: {
                    type: err,
                    content: "An error occurred posting your product, please try again"
                }
            })
        }
    },
    update: function (req, res) {
        db.Product
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        console.log(req.params.id)
    }
}