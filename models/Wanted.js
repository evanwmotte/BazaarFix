const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WantedSchema = new Schema({
    productName: {
        type: String,
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    notes: {
        type: String
    }
});

const Wanted = mongoose.model("Wanted", WantedSchema);

module.exports = Wanted;
