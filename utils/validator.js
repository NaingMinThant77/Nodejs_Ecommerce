module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            let result = schema.validate(req.body);
            if(result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    },
    validateParam: (schema, id) => {
        return (req, res, next) => {
            let obj = {};
            obj[`${id}`] = req.params[`${id}`];
            let result = schema.validate(obj);
            if (result.error) {
                next(new Error(result.error.details[0].message));
            } else {
                next();
            }
        }
    }
}