const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name : {type : String, required: true},
    members: [{type: String}],
    notes : [{
        title: String,
        content: String,
        tags: [String],
        createdBy: String,
        createdAt: Date,
        updatesAt: Date,
        lastUpdatesBy: { type: String, default : function() { return this.createdBy; } },
    },
],
    createdBy: { type: String, required: true},
    createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", groupSchema);
