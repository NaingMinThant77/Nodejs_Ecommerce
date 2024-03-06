const DB = require("../models/permit.js");
const helper = require("../utils/helper.js");

let add = async (req, res, next) => {
    let dbPermit = await DB.findOne({ name: req.body.name });
    if (dbPermit) {
        next(new Error("Permission Name is already in use"));
    } else {
        let data = new DB(req.body);
        let result = await data.save();
        helper.FormatMsg(res, "Permission Saved", result);
    }
}

let all = async (req, res) => {
    let permits = await DB.find().select('-__v');
    helper.FormatMsg(res, "All Permission", permits)
}

let get = async (req, res, next) => {
    let permit = await DB.findById(req.params.id).select('-__v');
    if (permit) {
        helper.FormatMsg(res, "Single Permission", permit)
    } else {
        next(new Error("No Permission Name with that id"));
    }
}

let patch = async (req, res, next) => {
    let permit = await DB.findById(req.params.id);
    if (permit) {
        await DB.findByIdAndUpdate(permit._id, req.body);
        let result = await DB.findById(permit._id)
        helper.FormatMsg(res, "Updated Permission Successfully!", result)
    } else {
        next(new Error("No Permission with that id"));
    }
}

let drop = async (req, res, next) => {
    let permit = await DB.findById(req.params.id);
    if (permit) {
        await DB.findByIdAndDelete(permit._id);
        let result = await DB.findById(permit._id)
        helper.FormatMsg(res, "Deleted Permission Successfully!", result)
    } else {
        next(new Error("No Permission with that id"));
    }
}

module.exports = { add, all, get, patch, drop };