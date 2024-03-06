const Joi = require("joi");

module.exports = {
    PermitSchema: {
        add: Joi.object({
            name: Joi.string().required()
        })
    },
    RoleSchema: {
        addPermit: Joi.object({
            roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    AllSchema: {
        id: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
}