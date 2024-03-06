const DB = require("../models/role");
const helper = require("../utils/helper");
const PermitDB = require("../models/permit");

let add = async (req, res, next) => {
    try {
        let dbRole = await DB.findOne({ name: req.body.name });
        if (dbRole) {
            next(new Error("Role Name is already in use"));
        } else {
            let data = new DB(req.body);
            let result = await data.save();
            helper.FormatMsg(res, "Role Saved", result);
        }
    } catch (error) {
        next(error);
    }
}

let all = async (req, res) => {
    let dbRole = await DB.find().populate('permit', '-__v').select('-__v');
    helper.FormatMsg(res, "Get All dbRole", dbRole)
}

let get = async (req, res, next) => {
    try {
        let dbRole = await DB.findById(req.params.id).select('-__v');
        if (dbRole) {
            helper.FormatMsg(res, "Get Single dbRole", dbRole);
        } else {
            next(new Error("No dbRole with that id"));
        }
    } catch (error) {
        next(error);
    }
}

let patch = async (req, res, next) => {
    try {
        let dbRole = await DB.findById(req.params.id);
        if (dbRole) {
            await DB.findByIdAndUpdate(dbRole._id, req.body);
            let result = await DB.findById(dbRole._id).select('-__v');
            helper.FormatMsg(res, "Update dbRole Successfully!", result);
        } else {
            next(new Error("No dbRole with that id"));
        }
    } catch (error) {
        next(error);
    }
}

let drop = async (req, res, next) => {
    try {
        let dbRole = await DB.findById(req.params.id);
        if (dbRole) {
            await DB.findByIdAndDelete(dbRole._id);
            let result = await DB.findById(dbRole._id);
            helper.FormatMsg(res, "Deleted Role Successfully!", result);
        } else {
            next(new Error("No Role with that id"));
        }
    } catch (error) {
        next(error);
    }
}

let roleAddPermit = async (req, res, next) => {
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await PermitDB.findById(req.body.permitId);

    if (dbRole && dbPermit) {
        await DB.findByIdAndUpdate(dbRole._id, { $push: { permit: dbPermit._id } });
        let updatedData = await DB.findById(dbRole._id).select('-__v');
        helper.FormatMsg(res, "Permit Add to Role", updatedData)
    } else {
        next(new Error("Role Id and Permit Id need to be valid"));
    }
}

let roleRemovePermit = async (req, res, next) => {
    let dbRole = await DB.findById(req.body.roleId);
    let dbPermit = await PermitDB.findById(req.body.permitId);

    if (dbRole && dbPermit) {
        await DB.findByIdAndUpdate(dbRole._id, { $pull: { permit: dbPermit._id } })
        let updatedData = await DB.findById(dbRole._id).select('-__v');
        helper.FormatMsg(res, "Permit Remove from Role", updatedData)
    } else {
        next(new Error("Role Id and Permit Id need to be valid"));
    }

}



module.exports = { add, all, get, patch, drop, roleAddPermit, roleRemovePermit };