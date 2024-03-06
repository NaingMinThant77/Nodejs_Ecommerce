const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema({
    name: { type: String, required: true },
    permit: [{ type: Schema.Types.ObjectId, ref: "permit" }] // Define permits as an array
})

const Role = mongoose.model('role', RoleSchema);
module.exports = Role;