const db = require("../models")

module.exports = {
    getAds: function (req, res) {
        db.Wanted
            .find({})
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Wanted
            .findById(req.user_id)
            .then(dbModel => res.json(dbModel))
            .then(res.send({
                message: { content: "Wanted Ad Posted" }
            }))
            .catch(err => res.status(422).json(err));
    },
    postAd: function (req, res) {
        try {
            db.Wanted
                .create(req.body)
                .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.user_id }, { $addToSet: { wantedPosts: _id } }))
                .then(res.status(201).send({
                    message: { content: "Wanted Ad Posted" }
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
        db.Wanted
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Wanted
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};